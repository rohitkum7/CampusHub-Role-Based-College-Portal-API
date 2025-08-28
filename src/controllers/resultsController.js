import { db } from "../libs/db.js";

export const createResult = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create Results",
      });
    }

    const { examName, score, totalMarks, grade, status, studentId } = req.body;

    if (!examName || !score || !totalMarks || !grade || !status || !studentId) {
      return res.status(400).json({
        success: false,
        message:
          "Exam Name, Score, Total Marks, Grade, Status, Student ID are required",
      });
    }

    const student = await db.user.findUnique({
      where: { id: studentId, role: "STUDENT" },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const result = await db.result.create({
      data: {
        studentId: student.id,
        studentName: student.name, // denormalized field
        createdById: req.user.id, // admin who creates the result
        examName,
        score,
        totalMarks,
        grade,
        status,
      },
    });

    return res.status(201).json({
      success: true,
      message: `Result for ${student.name} created successfully`,
      result,
    });
  } catch (error) {
    console.error("Error creating result:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating result",
    });
  }
};

export const getResults = async (req, res) => {
  try {
    const user = req.user;
    const { studentId } = req.params; // destructure properly
    const userData = await db.user.findUnique({ where: { id: user.id } });

    let resultData;

    if (userData.role === "STUDENT") {
      // student can only see their own result
      if (userData.id !== studentId) {
        return res.status(400).json({
          success: false,
          message: "Not allowed to view other's result",
        });
      }

      resultData = await db.result.findMany({
        where: { studentId: userData.id },
        select: {
          examName: true,
          score: true,
          totalMarks: true,
          grade: true,
          status: true,
          student: {
            select: { name: true }, // automatically get student name
          },
        },
      });
    }

    if (userData.role === "ADMIN" || userData.role === "FACULTY") {
      resultData = await db.result.findMany({
        where: { studentId },
        select: {
          examName: true,
          score: true,
          totalMarks: true,
          grade: true,
          status: true,
          student: {
            select: { name: true }, // student name here too
          },
          createdBy: {
            select: { name: true }, // admin/faculty who created it
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      resultData,
    });
  } catch (error) {
    console.error("Error fetching result:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching result",
    });
  }
};
