const crypto = require("crypto");
const CryptoJS = require("crypto-js");

const createHash = (data) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
};

const encryptObject = (
  obj,
  secretKey = Buffer.from("secretKeyApi").toString("base64")
) => {
  const objString = JSON.stringify(obj);
  const encrypted = CryptoJS.AES.encrypt(objString, secretKey).toString();
  return encrypted;
};

const decryptObject = (
  encrypted,
  secretKey = Buffer.from("secretKeyApi").toString("base64")
) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  const decryptedObj = JSON.parse(decryptedString);
  return decryptedObj;
};

// // Exemplo de uso:
// const obj = { name: 'John Doe', age: 30, email: 'johndoe@example.com' };

// const encryptedObj = encryptObject(obj);
// console.log('Objeto criptografado:', encryptedObj);

// const decryptedObj = decryptObject(encryptedObj);
// console.log('Objeto descriptografado:', decryptedObj);

module.exports = {
  createHash,
  encryptObject,
  decryptObject,
};
