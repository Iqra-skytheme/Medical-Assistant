import bcrypt from "bcrypt";
import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import DoctorProfile from "../models/DoctorProfile.js";
import jwt from "jsonwebtoken";

// ================= Register User =================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields."
      });
    }

    // Check role validity
    const userRole = role || "patient";
    if (!["patient", "doctor", "admin"].includes(userRole)) {
      return res.status(400).json({
        message: "Invalid user role specified."
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    // Create profile based on role
    let profile = null;
    if (userRole === "patient") {
      profile = await PatientProfile.create({ user: user._id });
    } else if (userRole === "doctor") {
      profile = await DoctorProfile.create({
        user: user._id,
        specialization: "General Practitioner",
        availabilitySlots: [
          { day: "Monday", startTime: "09:00", endTime: "17:00" },
          { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
          { day: "Friday", startTime: "09:00", endTime: "17:00" },
        ]
      });
    }

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: profile,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= Login User =================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields."
      });
    }

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Fetch corresponding profile if not admin
    let profile = null;
    if (user.role === "patient") {
      profile = await PatientProfile.findOne({ user: user._id });
    } else if (user.role === "doctor") {
      profile = await DoctorProfile.findOne({ user: user._id });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: profile,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};