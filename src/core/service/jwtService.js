const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const generate = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
  return { accessToken, refreshToken }
}

const verify = (token) => jwt.verify(token, JWT_SECRET)

module.exports = { generate, verify }
