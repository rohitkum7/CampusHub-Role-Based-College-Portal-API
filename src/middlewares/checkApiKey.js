import { db } from "../libs/db.js";

export const checkApiKey = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const foundKey = await db.apiKey.findFirst({
      where: {
        userId: req.user.id,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    if (!foundKey) {
      return res.status(403).json({ error: "Invalid or Expired API Key" });
    }

    req.apiKeyUser = foundKey.userId; // ✅ attach userId for downstream
    next();
  } catch (error) {
    console.error("Error validating API Key:", error);
    return res.status(500).json({ error: "Server Error validating API Key" });
  }
};
