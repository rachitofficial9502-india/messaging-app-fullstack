require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const express = require("express")
const { Server } = require("socket.io")
const authRoutes = require("./routes/authRoutes.js")
const convoRoute = require("./routes/convoRoutes.js")
const messageRoute = require("./routes/messageRoutes.js")
const app = express()
const Message = require("./models/message.js")


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

app.use("/api/auth", authRoutes)
app.use("/api/conversations", convoRoute)
app.use("/api/messages", messageRoute)

io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    socket.on("joinRoom", (convoId) => {
        socket.join(convoId)
        console.log("User joined room:", convoId)
    })

    socket.on("sendMessage", async (data) => {
        const newMessage = await Message.create(data)
        io.to(data.convoId).emit("receiveMessage", newMessage)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
    })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected...")
    })
    .catch((err) => {
        console.log("error: ", err)
    })
    .then(() => {
        server.listen(3000, () => {
            console.log("server is listening...")
        })
    })


