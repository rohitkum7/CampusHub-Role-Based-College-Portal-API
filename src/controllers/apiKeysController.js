import { db } from "../libs/db.js";
import { generateApiKey } from "../libs/apiKeys.js";

export const createUserApiKey = async (userId) => {
  const { keyHash } = generateApiKey();

  const expiresAt = new Date(
    Date.now() + Number(process.env.API_KEY_EXPIRES_IN) * 24 * 60 * 60 * 1000
  );

  const record = await db.apiKey.create({
    data: {
      userId,
      keyHash,
      expiresAt,
      lastUsedAt: new Date(),
    },
    select: {
      id: true,
      isActive: true,
      createdAt: true,
      expiresAt: true,
      lastUsedAt: true,
    },
  });

  return { keyHash, record };
};
