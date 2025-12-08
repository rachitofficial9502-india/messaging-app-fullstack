const express = require("express")
const router = express.Router()
const { signUp, login, logout } = require("../controllers/authControllers.js")

router.post("/login", login)
router.post("/signup", signUp)
router.post("/logout", logout)

module.exports = router