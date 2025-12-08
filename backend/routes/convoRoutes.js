const express = require("express")
const router = express.Router()
const { createOrGetConversation, getUserConversation } = require("../controllers/convoControllers.js")

router.post("/", createOrGetConversation)
router.get("/:userId", getUserConversation)

module.exports = router