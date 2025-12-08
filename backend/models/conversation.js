const mongoose = require("mongoose")

const convoSchema = new mongoose.Schema({
    members: {
        type: [String],
        required: true
    },
    lastMessage: {
        type: String,
        default: ""
    }
}, {timestamps: true})

module.exports = mongoose.model("Convo", convoSchema)