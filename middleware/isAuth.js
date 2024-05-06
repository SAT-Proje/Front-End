const jwt = require("jsonwebtoken")
const crypto = require("crypto")
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    const error = new Error("Not authenticated. Header error")
    error.statusCode = 401
    throw error
  }
  const token = authHeader.split(" ")[1]
  let decodedToken
  const hashString = crypto.randomBytes(64).toString("hex")
  try {
    decodedToken = jwt.verify(token, hashString)
  } catch (err) {
    err.statusCode = 500
    throw err
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated. Token error")
    error.statusCode = 401
    throw error
  }
  req._id = decodedToken._id
  console.log("isAuth.js: ", req._id)
  next()
}
