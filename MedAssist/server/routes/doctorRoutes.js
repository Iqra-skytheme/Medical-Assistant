import express from "express";
import {
  getDoctorAppointments,
  getDoctorPatients,
  updateDoctorSettings,
  updateAppointmentStatus,
  getDoctorProfile,
} from "../controllers/doctorController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Secure all doctor routes
router.use(protect);
router.use(restrictTo("doctor"));

router.get("/profile", getDoctorProfile);
router.get("/appointments", getDoctorAppointments);
router.get("/patients", getDoctorPatients);
router.patch("/profile", updateDoctorSettings);
router.patch("/appointments/status", updateAppointmentStatus);

export default router;
