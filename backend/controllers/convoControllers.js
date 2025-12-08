const Convo = require("../models/conversation.js")

async function createOrGetConversation(req, res) {
    
    const { senderId, receiverId } = req.body
    console.log("Sender", senderId)
    console.log("Receiver", receiverId)

    if ( senderId == undefined || "" || receiverId == undefined || "") {
        return res.status(400).json({
            success: false,
            message: "sender or receiver Id missing!" 
        })
    }
    
    console.log("Both id valid...")

    const existing = await Convo.findOne({
        members: { $all: [senderId, receiverId]}
    })
    if (existing) {
        console.log("Conversation exists", existing)
        return res.status(200).json(existing)
    }
    const newConvo = await Convo.create({
        members: [senderId, receiverId]
    })
    console.log("New conversation created", newConvo)
    return res.status(201).json(newConvo)

}

async function getUserConversation(req, res) {

    const userId = req.params.userId
    console.log("UserId:", userId)
    const conversations = await Convo.find({
        members: { $in: [userId]}
    }).sort({updatedAt: -1})
    console.log("Conversations found...")
    return res.status(200).json(conversations)

}

module.exports = {
    createOrGetConversation,
    getUserConversation
}