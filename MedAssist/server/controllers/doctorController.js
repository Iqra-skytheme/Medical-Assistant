import User from "../models/User.js";
import DoctorProfile from "../models/DoctorProfile.js";
import PatientProfile from "../models/PatientProfile.js";
import Appointment from "../models/Appointment.js";
import MedicalRecord from "../models/MedicalRecord.js";
import Notification from "../models/Notification.js";

// GET doctor's booked appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate("patient", "name email")
      .sort({ date: 1, timeSlot: 1 });

    const enrichedAppointments = [];

    for (const appt of appointments) {
      if (appt.patient) {
        const patientProfile = await PatientProfile.findOne({ user: appt.patient._id });
        enrichedAppointments.push({
          _id: appt._id,
          date: appt.date,
          timeSlot: appt.timeSlot,
          status: appt.status,
          reason: appt.reason,
          patient: {
            _id: appt.patient._id,
            name: appt.patient.name,
            email: appt.patient.email,
            phone: patientProfile?.phone || "",
            gender: patientProfile?.gender || "",
            dateOfBirth: patientProfile?.dateOfBirth || null,
          },
        });
      }
    }

    res.status(200).json({ success: true, appointments: enrichedAppointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch appointments." });
  }
};

// GET doctor's distinct patients
export const getDoctorPatients = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id }).populate("patient", "name email");

    const patientMap = {};
    for (const appt of appointments) {
      if (appt.patient && !patientMap[appt.patient._id]) {
        const patientProfile = await PatientProfile.findOne({ user: appt.patient._id });
        const patientRecords = await MedicalRecord.find({ patient: appt.patient._id });

        patientMap[appt.patient._id] = {
          _id: appt.patient._id,
          name: appt.patient.name,
          email: appt.patient.email,
          phone: patientProfile?.phone || "",
          gender: patientProfile?.gender || "",
          dateOfBirth: patientProfile?.dateOfBirth || null,
          recordsCount: patientRecords.length,
        };
      }
    }

    res.status(200).json({ success: true, patients: Object.values(patientMap) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch patients list." });
  }
};

// PATCH update doctor availability slots and specialization
export const updateDoctorSettings = async (req, res) => {
  try {
    const { name, phone, biography, specialization, availabilitySlots } = req.body;
    const userId = req.user._id;

    if (name) {
      await User.findByIdAndUpdate(userId, { name });
    }

    const updatedProfile = await DoctorProfile.findOneAndUpdate(
      { user: userId },
      { phone, biography, specialization, availabilitySlots },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully.",
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

// PATCH update appointment status (done, cancelled)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    if (!["done", "cancelled", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const appointment = await Appointment.findOne({ _id: appointmentId, doctor: req.user._id }).populate(
      "patient",
      "name"
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found for this doctor." });
    }

    appointment.status = status;
    await appointment.save();

    // Create Patient Notification
    await Notification.create({
      recipient: appointment.patient._id,
      title: `Appointment ${status.toUpperCase()}`,
      message: `Your appointment with Dr. ${req.user.name} on ${appointment.date} has been updated to ${status}.`,
    });

    res.status(200).json({ success: true, message: `Appointment status updated to ${status}.`, appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update appointment status." });
  }
};

// GET doctor profile settings
export const getDoctorProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Doctor profile not found." });
    }
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch profile settings." });
  }
};
