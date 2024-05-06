const express = require("express")
const isAuth = require("../middleware/isAuth")
const router = express.Router()
const UserController = require("../controllers/UserController")

// Define routes
router.get("/", isAuth, UserController.getAllUsers)
router.get("/:id", isAuth, UserController.getUserById)
router.post("/", isAuth, UserController.createUser)
router.put("/:id", isAuth, UserController.updateUserById)
router.delete("/:id", isAuth, UserController.deleteUserById)

module.exports = router
