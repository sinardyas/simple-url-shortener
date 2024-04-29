import crypto from "node:crypto";

/**
 * Generate a random OTP
 * @returns
 */
const generateRandomId = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  while (id.length < 10) {
    const randomBytes = crypto.randomBytes(4);
    const randomIndex = randomBytes.readUInt32BE(0) % chars.length;
    id += chars.charAt(randomIndex);
  }

  return id;
};

export { generateRandomId };
