import crypto from "crypto";

export function generateApiKey() {
  const plainToken = crypto.randomBytes(32).toString("hex");
  const keyHash = crypto.createHash("sha256").update(plainToken).digest("hex");
  return { keyHash };
}
