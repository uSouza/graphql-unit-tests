const CryptoJS = require("crypto-js")

const { JWT_SECRET } = process.env

const encrypt = (text) => {
  return CryptoJS.Rabbit.encrypt(text, JWT_SECRET)
}

const decrypt = (text) => {
  return CryptoJS.Rabbit.decrypt(text, JWT_SECRET).toString(CryptoJS.enc.Utf8)
}

module.exports = { encrypt, decrypt }
