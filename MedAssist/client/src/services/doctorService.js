import api from "./api";

// Get logged-in doctor profile details & availability slots
export const getDoctorProfile = async () => {
  const response = await api.get("/doctor/profile");
  return response.data;
};

// Update doctor profile (name, phone, biography, specialization, availability slots)
export const updateDoctorProfile = async (profileData) => {
  const response = await api.patch("/doctor/profile", profileData);
  return response.data;
};

// Get doctor's booked appointments
export const getDoctorAppointments = async () => {
  const response = await api.get("/doctor/appointments");
  return response.data;
};

// Get doctor's distinct patients list
export const getDoctorPatients = async () => {
  const response = await api.get("/doctor/patients");
  return response.data;
};

// Update status of patient's booking (done, cancelled, pending)
export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.patch("/doctor/appointments/status", {
    appointmentId,
    status,
  });
  return response.data;
};
