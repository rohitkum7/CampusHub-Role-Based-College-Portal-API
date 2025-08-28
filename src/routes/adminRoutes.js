import express from "express";
import { protect } from "../middlewares/protectMiddleware.js";
import { requireRole } from "../middlewares/checkRole.js";
import { checkApiKey } from "../middlewares/checkApiKey.js";
import { getAllUsers, updateUserRole } from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.get(
  "/users",
  protect,
  requireRole(["ADMIN"]),
  checkApiKey,
  getAllUsers
);
adminRoutes.put(
  "/users/:id/role",
  protect,
  requireRole(["ADMIN"]),
  checkApiKey,
  updateUserRole
);

export default adminRoutes;
