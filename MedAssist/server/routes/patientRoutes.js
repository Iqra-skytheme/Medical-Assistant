import express from "express";
import {
  getDoctorsList,
  bookAppointment,
  getPatientAppointments,
  getPatientRecords,
  uploadMedicalRecord,
  updatePatientSettings,
  getNotifications,
  markNotificationsRead,
  upload,
} from "../controllers/patientController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Secure all patient routes
router.use(protect);
router.use(restrictTo("patient"));

router.get("/doctors", getDoctorsList);
router.post("/book", bookAppointment);
router.get("/appointments", getPatientAppointments);
router.get("/records", getPatientRecords);
router.post("/records/upload", upload.single("file"), uploadMedicalRecord);
router.patch("/profile", updatePatientSettings);
router.get("/notifications", getNotifications);
router.patch("/notifications/read", markNotificationsRead);

export default router;
