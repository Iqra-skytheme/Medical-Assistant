import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import DoctorProfile from "../models/DoctorProfile.js";
import Appointment from "../models/Appointment.js";
import MedicalRecord from "../models/MedicalRecord.js";

// GET system metrics overview
export const getSystemOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: "pending" });
    const doneAppointments = await Appointment.countDocuments({ status: "done" });
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });

    res.status(200).json({
      totalUsers,
      pendingAppointments,
      doneAppointments,
      totalPatients,
      totalDoctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch metrics." });
  }
};

// GET accounts list (with filters)
export const getAccounts = async (req, res) => {
  try {
    const { type } = req.query; // all, patient, doctor
    const query = {};
    if (type === "patient") query.role = "patient";
    if (type === "doctor") query.role = "doctor";

    const users = await User.find(query).select("-password").sort({ createdAt: -1 });
    const enrichedAccounts = [];

    for (const user of users) {
      let profile = null;
      let status = "active";

      if (user.role === "patient") {
        profile = await PatientProfile.findOne({ user: user._id });
      } else if (user.role === "doctor") {
        profile = await DoctorProfile.findOne({ user: user._id });
        status = profile?.status || "active";
      }

      enrichedAccounts.push({
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.role.toUpperCase(),
        status: status.toUpperCase(),
        createdAt: user.createdAt,
      });
    }

    res.status(200).json(enrichedAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch accounts list." });
  }
};

// PATCH update account (admin action)
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Account updated.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed." });
  }
};

// DELETE account (admin action)
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Clean up related profiles & data
    if (user.role === "patient") {
      await PatientProfile.findOneAndDelete({ user: id });
      await Appointment.deleteMany({ patient: id });
      await MedicalRecord.deleteMany({ patient: id });
    } else if (user.role === "doctor") {
      await DoctorProfile.findOneAndDelete({ user: id });
      await Appointment.deleteMany({ doctor: id });
    }

    res.status(200).json({ success: true, message: "Account and associated data deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deletion failed." });
  }
};

// GET all patients with appointment logs
export const getPatientsLogs = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("name email createdAt");
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch patients." });
  }
};

// GET all global appointments logs
export const getPatientAppointmentsLogs = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .sort({ createdAt: -1 });

    const formattedLogs = appointments.map((appt) => ({
      id: appt._id,
      patientId: appt.patient?._id || "",
      patientName: appt.patient?.name || "N/A",
      email: appt.patient?.email || "N/A",
      doctorName: appt.doctor?.name || "N/A",
      time: `${appt.date} at ${appt.timeSlot}`,
      status: appt.status,
      createdAt: appt.createdAt,
    }));

    res.status(200).json(formattedLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments logs." });
  }
};

// GET all doctors (for admin panel verification)
export const getDoctorsAdminList = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name email createdAt");
    const doctorList = [];

    for (const doc of doctors) {
      const profile = await DoctorProfile.findOne({ user: doc._id });
      doctorList.push({
        id: doc._id,
        name: doc.name,
        email: doc.email,
        specialization: profile?.specialization || "General Practitioner",
        status: profile?.status || "active",
        createdAt: doc.createdAt,
      });
    }

    res.status(200).json(doctorList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctor admin list." });
  }
};

// PATCH set doctor account active/inactive
export const setDoctorStatus = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { status } = req.body;

    const updatedProfile = await DoctorProfile.findOneAndUpdate(
      { user: doctorId },
      { status },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Doctor profile not found." });
    }

    res.status(200).json({ success: true, message: `Doctor status updated to ${status}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle status." });
  }
};
