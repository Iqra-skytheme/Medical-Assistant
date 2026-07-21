import express from "express";
import {
  getSystemOverview,
  getAccounts,
  updateAccount,
  deleteAccount,
  getPatientsLogs,
  getPatientAppointmentsLogs,
  getDoctorsAdminList,
  setDoctorStatus,
} from "../controllers/adminController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Secure all admin routes
router.use(protect);
router.use(restrictTo("admin"));

router.get("/overview", getSystemOverview);
router.get("/accounts", getAccounts);
router.patch("/accounts/:id", updateAccount);
router.delete("/accounts/:id", deleteAccount);
router.get("/patients", getPatientsLogs);
router.get("/patients/appointments", getPatientAppointmentsLogs);
router.get("/doctors", getDoctorsAdminList);
router.patch("/doctors/:doctorId/status", setDoctorStatus);

export default router;
