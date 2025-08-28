import express from "express";
import { protect } from "../middlewares/protectMiddleware.js";
import { requireRole } from "../middlewares/checkRole.js";
import { checkApiKey } from "../middlewares/checkApiKey.js";
import {
  createAnnouncement,
  getAnnouncement,
} from "../controllers/announcementsController.js";

const announcementRoutes = express.Router();

announcementRoutes.post(
  "/create-announcement",
  protect,
  requireRole(["FACULTY", "ADMIN"]),
  checkApiKey,
  createAnnouncement
);

announcementRoutes.get("/get-announcements", getAnnouncement);

export default announcementRoutes;
