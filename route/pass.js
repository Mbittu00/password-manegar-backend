import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const algorithm = "aes-256-cbc";
let Securitykey = "5UOrFox%J2cXitOm^p9#H3SKirhwy&da";

let genPass = () => {
  let cer = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let padd = "";
  for (let i = 0; i < 16; i++) {
    padd += cer.charAt(Math.floor(Math.random() * cer.length));
  }
  return padd;
};

let encrypt = (password) => {
  let id = genPass();
  // let id='11111'
  const cipher = crypto.createCipheriv(algorithm, Securitykey, id);
  let encryptedData = cipher.update(password, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  return {encryptedData,id};
};
let decrypt = (id, password) => {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, id);
  let decryptedData = decipher.update(password, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData
};
export { encrypt, decrypt };
