const express = require("express")
const router = express.Router()
const { sendMessage, getMessage } = require("../controllers/messageControllers.js")

router.post("/", sendMessage)
router.get("/:conversationId", getMessage)

module.exports = router