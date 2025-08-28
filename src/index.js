import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/notifications", notificationRoutes);

//Error handling

//Server Running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
