import express from "express";
import { protect } from "../middlewares/protectMiddleware.js";
import { requireRole } from "../middlewares/checkRole.js";
import { checkApiKey } from "../middlewares/checkApiKey.js";
import { sendEmailNotification } from "../controllers/notificationController.js";

const notificationRoutes = express.Router();

notificationRoutes.post(
  "/",
  protect,
  requireRole(["ADMIN", "FACULTY"]),
  checkApiKey,
  sendEmailNotification
);

export default notificationRoutes;
