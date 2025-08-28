import { db } from "../libs/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const userData = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      userData,
    });
  } catch (error) {
    console.error("Error fetching userData:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching userData",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = req.user;

    // ✅ Only ADMIN can update roles
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const { id } = req.params; // user ID whose role will be updated
    const { role } = req.body; // new role
    const updateRole = role.toUpperCase();

    // ✅ Fetch the target user first
    const targetUser = await db.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent updating other ADMINs
    if (targetUser.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "You cannot update another ADMIN",
      });
    }

    // Update role
    const updatedUser = await db.user.update({
      where: { id },
      data: { role: updateRole },
    });

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating role",
    });
  }
};
