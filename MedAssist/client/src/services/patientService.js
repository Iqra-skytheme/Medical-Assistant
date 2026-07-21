import api from "./api";

// Get all active doctors with specialization and availability slots
export const getDoctorsList = async () => {
  const response = await api.get("/patient/doctors");
  return response.data;
};

// Book a new appointment slot
export const bookAppointment = async (bookingData) => {
  const response = await api.post("/patient/book", bookingData);
  return response.data;
};

// Get patient's booked appointments
export const getPatientAppointments = async () => {
  const response = await api.get("/patient/appointments");
  return response.data;
};

// Get patient's medical records
export const getPatientRecords = async () => {
  const response = await api.get("/patient/records");
  return response.data;
};

// Upload new medical record file
export const uploadMedicalRecord = async (formData) => {
  const response = await api.post("/patient/records/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update patient profile (name, phone, gender, dateOfBirth, notificationsEnabled)
export const updatePatientSettings = async (profileData) => {
  const response = await api.patch("/patient/profile", profileData);
  return response.data;
};

// Get in-app notifications list
export const getNotifications = async () => {
  const response = await api.get("/patient/notifications");
  return response.data;
};

// Mark all in-app notifications as read
export const markNotificationsRead = async () => {
  const response = await api.patch("/patient/notifications/read");
  return response.data;
};
