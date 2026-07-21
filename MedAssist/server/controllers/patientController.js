import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import DoctorProfile from "../models/DoctorProfile.js";
import Appointment from "../models/Appointment.js";
import MedicalRecord from "../models/MedicalRecord.js";
import Notification from "../models/Notification.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, documents (doc, docx), and images (jpg, png) are allowed!"));
    }
  },
});

// GET all active doctors with profiles
export const getDoctorsList = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    const activeDoctorProfiles = [];

    for (const doc of doctors) {
      const profile = await DoctorProfile.findOne({ user: doc._id });
      if (profile && profile.status === "active") {
        activeDoctorProfiles.push({
          _id: doc._id,
          name: doc.name,
          email: doc.email,
          specialization: profile.specialization,
          phone: profile.phone,
          biography: profile.biography,
          availabilitySlots: profile.availabilitySlots,
        });
      }
    }

    res.status(200).json({ success: true, doctors: activeDoctorProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch doctors list" });
  }
};

// POST book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;
    const patientId = req.user._id;

    if (!doctorId || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: "Doctor, date, and timeslot are required." });
    }

    // 1. Fetch Doctor Profile
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    const doctorProfile = await DoctorProfile.findOne({ user: doctorId });
    if (!doctorProfile || doctorProfile.status !== "active") {
      return res.status(400).json({ success: false, message: "Doctor is currently unavailable." });
    }

    // 2. Validate day of week availability
    // e.g. date is "2026-07-20" -> Day is "Monday"
    const parsedDate = new Date(date);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bookingDay = daysOfWeek[parsedDate.getDay()];

    const matchingSlot = doctorProfile.availabilitySlots.find(
      (slot) => slot.day.toLowerCase() === bookingDay.toLowerCase()
    );

    if (!matchingSlot) {
      return res.status(400).json({
        success: false,
        message: `Doctor is not available on ${bookingDay}s.`,
      });
    }

    // 3. Validate booking time falls within available hours
    // e.g., timeSlot is "14:30"
    const [slotHour, slotMin] = timeSlot.split(":").map(Number);
    const [startHour, startMin] = matchingSlot.startTime.split(":").map(Number);
    const [endHour, endMin] = matchingSlot.endTime.split(":").map(Number);

    const slotTimeMinutes = slotHour * 60 + slotMin;
    const startTimeMinutes = startHour * 60 + startMin;
    const endTimeMinutes = endHour * 60 + endMin;

    if (slotTimeMinutes < startTimeMinutes || slotTimeMinutes > endTimeMinutes) {
      return res.status(400).json({
        success: false,
        message: `Selected timeslot ${timeSlot} is outside the doctor's hours (${matchingSlot.startTime} - ${matchingSlot.endTime}).`,
      });
    }

    // 4. Check double booking
    const existingAppt = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
      status: { $ne: "cancelled" },
    });

    if (existingAppt) {
      return res.status(400).json({
        success: false,
        message: "This timeslot is already booked for this doctor. Please choose another slot.",
      });
    }

    // 5. Create Appointment
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reason,
    });

    // 6. Create Notifications
    await Notification.create({
      recipient: patientId,
      title: "Appointment Booked",
      message: `You successfully booked an appointment with Dr. ${doctor.name} on ${date} at ${timeSlot}.`,
    });

    await Notification.create({
      recipient: doctorId,
      title: "New Appointment",
      message: `Patient ${req.user.name} has booked an appointment with you on ${date} at ${timeSlot}.`,
    });

    res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Booking failed." });
  }
};

// GET patient's appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "name email")
      .sort({ date: 1, timeSlot: 1 });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch appointments" });
  }
};

// GET patient's medical records
export const getPatientRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.user._id })
      .populate("doctor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch medical records" });
  }
};

// POST upload medical record
export const uploadMedicalRecord = async (req, res) => {
  try {
    const { description } = req.body;
    const patientId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please select a file to upload." });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fileType = path.extname(req.file.originalname).substring(1) === "pdf" ? "pdf" : "image"; // simplify type

    const record = await MedicalRecord.create({
      patient: patientId,
      fileName: req.file.originalname,
      fileUrl,
      fileType,
      description,
    });

    res.status(201).json({ success: true, message: "Record uploaded successfully", record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed." });
  }
};

// PATCH update patient profile and preferences
export const updatePatientSettings = async (req, res) => {
  try {
    const { 
      name, 
      phone, 
      dateOfBirth, 
      gender, 
      notificationPreferences,
      bloodGroup,
      height,
      weight,
      emergencyContactName,
      emergencyContactPhone,
      allergies,
      chronicConditions
    } = req.body;
    const userId = req.user._id;

    // Update user name
    if (name) {
      await User.findByIdAndUpdate(userId, { name });
    }

    // Update patient profile
    const updatedProfile = await PatientProfile.findOneAndUpdate(
      { user: userId },
      { 
        phone, 
        dateOfBirth, 
        gender, 
        notificationPreferences,
        bloodGroup,
        height: height ? Number(height) : null,
        weight: weight ? Number(weight) : null,
        emergencyContactName,
        emergencyContactPhone,
        allergies,
        chronicConditions
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: req.user._id,
        name: name || req.user.name,
        email: req.user.email,
        role: req.user.role,
        profile: updatedProfile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update profile settings." });
  }
};

// GET in-app notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch notifications." });
  }
};

// PATCH mark notifications as read
export const markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    res.status(200).json({ success: true, message: "Notifications marked as read." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update notifications." });
  }
};
