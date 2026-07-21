import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: "",
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    emergencyContactName: {
      type: String,
      default: "",
    },
    emergencyContactPhone: {
      type: String,
      default: "",
    },
    allergies: {
      type: String,
      default: "",
    },
    chronicConditions: {
      type: String,
      default: "",
    },
    notificationPreferences: {
      type: String,
      enum: ["in-app", "platform", "both"],
      default: "both",
    },
  },
  {
    timestamps: true,
  }
);

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

export default PatientProfile;
