import CryptoJS from "crypto-js";

const SECRET_KEY =
  "'Zr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfT"; // 16-byte key (AES-128)
const KEY = CryptoJS.enc.Utf8.parse(SECRET_KEY); // Parse the key

// Encrypt function
export const encryptData = (data) => {
  if (!data) return null;

  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  const encrypted = CryptoJS.AES.encrypt(data.toString(), KEY, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });

  return iv.toString(CryptoJS.enc.Base64) + ":" + encrypted.toString(); // Combine IV + Encrypted Text
};

// Decrypt function
export const decryptData = (ciphertext) => {
  if (!ciphertext) return null;

  const [ivBase64, encryptedText] = ciphertext.split(":");
  const iv = CryptoJS.enc.Base64.parse(ivBase64);

  const decrypted = CryptoJS.AES.decrypt(encryptedText, KEY, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
