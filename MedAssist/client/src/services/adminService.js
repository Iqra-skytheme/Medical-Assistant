import api from "./api";

// Get Overview System metrics
export const getSystemOverview = async () => {
  const response = await api.get("/admin/overview");
  return response.data;
};

// Get All User Accounts
export const getAccounts = async (role = "") => {
  const response = await api.get(`/admin/accounts${role ? `?role=${role}` : ""}`);
  return response.data;
};

// Update General Account Info
export const updateAccount = async (id, accountData) => {
  const response = await api.patch(`/admin/accounts/${id}`, accountData);
  return response.data;
};

// Delete Account permanently
export const deleteAccount = async (id) => {
  const response = await api.delete(`/admin/accounts/${id}`);
  return response.data;
};

// Get Patient Profiles logs
export const getPatientsLogs = async () => {
  const response = await api.get("/admin/patients");
  return response.data;
};

// Get Global Appointments registry logs
export const getPatientAppointmentsLogs = async () => {
  const response = await api.get("/admin/patients/appointments");
  return response.data;
};

// Get Doctor Profiles & Specialty directory
export const getDoctorsAdminList = async () => {
  const response = await api.get("/admin/doctors");
  return response.data;
};

// Activate or deactivate doctor specialist account
export const setDoctorStatus = async (doctorId, status) => {
  const response = await api.patch(`/admin/doctors/${doctorId}/status`, { status });
  return response.data;
};
