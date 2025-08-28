import { db } from "../libs/db.js";

export const createMaterials = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "FACULTY") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create Materials",
      });
    }
    const { courseId } = req.params;
    const courseData = await db.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        name: true,
      },
    });
    const { title, type, description } = req.body;
    const material = await db.material.create({
      data: {
        title,
        description,
        type,
        createdById: user.id,
        courseId,
      },
      include: {
        course: { select: { id: true, name: true } },
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "Materials Created!", material });
  } catch (error) {
    console.error("Error creating Material:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating material",
    });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "FACULTY" && user.role !== "STUDENT") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to get Materials",
      });
    }
    const { courseId } = req.params;
    const materialData = await db.material.findMany({
      where: { courseId: courseId },
      select: {
        id: true,
        title: true,
        type: true,
        description: true,
        course: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Materials Fetched Successfully",
      materialData,
    });
  } catch (error) {
    console.error("Error getting Material:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while getting material",
    });
  }
};
