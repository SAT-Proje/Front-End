const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require("dotenv").config()
module.exports = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"]
  try {
    const user = jwt.verify(token, process.env.SIGNATURE_KEY)
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" })
  }
}
