import express from "express";
import { protect } from "../middlewares/protectMiddleware.js";
import { requireRole } from "../middlewares/checkRole.js";
import { checkApiKey } from "../middlewares/checkApiKey.js";
import {
  createCourses,
  getCourse,
  getCourses,
} from "../controllers/coursesController.js";
import {
  createMaterials,
  getMaterials,
} from "../controllers/materialController.js";

const courseRoutes = express.Router();

courseRoutes.post(
  "/",
  protect,
  requireRole(["ADMIN"]),
  checkApiKey,
  createCourses
);

courseRoutes.get("/get-courses", getCourses);
courseRoutes.get("/:courseId", getCourse);
courseRoutes.post(
  "/:courseId/materials",
  protect,
  requireRole(["FACULTY"]),
  checkApiKey,
  createMaterials
);
courseRoutes.get(
  "/:courseId/materials",
  protect,
  requireRole(["FACULTY", "STUDENT"]),
  getMaterials
);
export default courseRoutes;
