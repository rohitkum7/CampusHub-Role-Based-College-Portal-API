import express from "express";
import { login, register } from "../controllers/authController.js";
import { protect } from "../middlewares/protectMiddleware.js";
import { db } from "../libs/db.js";
import axios from "axios";
import { createUserApiKey } from "../controllers/apiKeysController.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post(
  "/login",
  protect,

  async (req, res, next) => {
    try {
      const user = req.user;

      if (user.role === "STUDENT") {
        return login(req, res);
      }

      const existingKey = await db.apiKey.findFirst({
        where: {
          userId: user.id,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
      });

      if (!existingKey) {
        const { keyHash, record } = await createUserApiKey(user.id);
        req.apiKeyResponse = { apiKey: keyHash, meta: record };
      }

      // run login and capture its response
      return login(req, res);
    } catch (error) {
      console.error("Error in login flow", error.message);
      return res.status(500).json({ success: false, error: "login failed" });
    }
  }
);

export default authRoutes;
