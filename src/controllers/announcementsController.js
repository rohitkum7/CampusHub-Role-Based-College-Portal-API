import { db } from "../libs/db.js";

export const createAnnouncement = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "FACULTY" && user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create announcements",
      });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const announcement = await db.announcement.create({
      data: {
        title,
        content,
        userId: user.id, // link to the logged-in user
      },
    });

    return res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating announcement",
    });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const announcements = await db.announcement.findMany({
      select: {
        title: true,
        content: true,
      },
    });

    return res.status(200).json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.error("Error getting announcement:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while getting announcement",
    });
  }
};
