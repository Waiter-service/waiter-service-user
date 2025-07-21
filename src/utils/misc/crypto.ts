import crypto from "crypto";

const secretKey =
  "5fbaef53eab424a62739b5935543a1522fddf462e00b59791aede33535886a5c";

export function decryptData(encryptedData: string): {
  barId: number;
  tableId: number;
} {
  const [ivHex, encryptedHex] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return JSON.parse(decrypted.toString("utf8"));
}
