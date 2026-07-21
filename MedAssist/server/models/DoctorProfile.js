import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema({
  day: {
    type: String, // e.g., "Monday", "Tuesday"
    required: true,
  },
  startTime: {
    type: String, // e.g., "09:00"
    required: true,
  },
  endTime: {
    type: String, // e.g., "17:00"
    required: true,
  },
});

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      default: "General Practitioner",
    },
    phone: {
      type: String,
      default: "",
    },
    biography: {
      type: String,
      default: "",
    },
    availabilitySlots: [availabilitySlotSchema],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);

export default DoctorProfile;
