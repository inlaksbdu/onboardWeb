import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Use a strong key for encryption

export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, secretKey).toString();
};

export const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
