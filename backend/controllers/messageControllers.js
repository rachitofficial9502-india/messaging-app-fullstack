const Message = require("../models/message.js")

async function sendMessage (req, res) {

    console.log("hit sendMessage function...")

    const { senderId, convoId, text } = req.body

    console.log("sender Id:", senderId)
    console.log("conversation Id:", convoId)
    console.log("text:", text)

    if (senderId == undefined || "" || convoId == undefined || "" || text == undefined || "") {
        return res.status(400).json({
            success: false,
            message: "Fields invalid!"
        })
    }
    console.log("Fields valid...")
    const newMessage = await Message.create({
        convoId,
        senderId,
        text
    })
    console.log("New message created", newMessage)
    return res.status(201).json(newMessage)

} 

async function getMessage (req, res) {

    console.log("Hit getMessage function...")

    const convoId = req.params.conversationId
    console.log("conversation Id:", convoId)

    if (convoId == undefined || "") {
        return res.status(400).json({
            success: false,
            message: "Conversation Id missing..."
        })
    }
    console.log("Id is present...")

    const message = await Message.find({convoId}).sort({ createdAt: -1 })
    console.log("Messages:", message)
    return res.status(200).json(message)

}

module.exports = {
    sendMessage,
    getMessage
}