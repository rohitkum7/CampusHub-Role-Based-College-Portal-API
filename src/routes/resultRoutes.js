import express from "express";
import { protect } from "../middlewares/protectMiddleware.js";
import { requireRole } from "../middlewares/checkRole.js";
import { checkApiKey } from "../middlewares/checkApiKey.js";
import { createResult, getResults } from "../controllers/resultsController.js";
const resultRoutes = express.Router();

resultRoutes.post(
  "/",
  protect,
  requireRole(["ADMIN"]),
  checkApiKey,
  createResult
);

resultRoutes.get("/:studentId", protect, getResults);

export default resultRoutes;
