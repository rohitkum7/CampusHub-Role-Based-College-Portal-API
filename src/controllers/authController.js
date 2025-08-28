import { db } from "../libs/db.js";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const registerToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = registerToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user,
    },
  });
};

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });
    createSendToken(newUser, 201, res);
  } catch (error) {
    console.error("Error in creating the user: ", error);
    res.status(500).json({ success: false, error: "Error in creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    createSendToken(user, 200, res);
  } catch (error) {
    console.error("Error in logging in the user: ", error);
    res.status(500).json({ success: false, error: "Error in Signing user" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      success: false,
      message: "User Authenticated Successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 100),
    httpOnly: true,
  });
  res.status(200).json({ success: true });
};
