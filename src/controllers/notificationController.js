import { novu } from "../libs/novuClient.js";

export const sendEmailNotification = async (req, res) => {
  try {
    const user = req.user; // comes from auth middleware
    if (!["ADMIN", "FACULTY"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to send notifications",
      });
    }

    const { studentId, email, name, message } = req.body;

    await novu.trigger("onboarding-demo-workflow", {
      to: {
        subscriberId: studentId,
        email: email,
      },
      payload: {
        name,
        message,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Email notification sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email notification",
    });
  }
};
