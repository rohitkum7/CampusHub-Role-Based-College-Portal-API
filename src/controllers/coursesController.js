import { db } from "../libs/db.js";

export const createCourses = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create Courses",
      });
    }

    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is a required feild",
      });
    }

    const course = await db.course.create({
      data: {
        name,
        description,
        createdById: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Course created Successfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while course result",
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await db.course.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Course fetched Successfully",
      courses,
    });
  } catch (error) {
    console.error("Error getting course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while getting course details",
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: {
        name: true,
        description: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: `Course data fetched Successfully`,
      course,
    });
  } catch (error) {
    console.error("Error getting course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while getting course details",
    });
  }
};
