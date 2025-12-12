📱 Real-Time Chat Application (MERN + Socket.IO)

A full-stack messaging application built with MongoDB, Express, React, Node.js, and Socket.IO that supports:

✔ Real-time messaging
✔ Conversation rooms
✔ Authentication (Login / Signup)
✔ Create new chats
✔ Automatic message updates
✔ Fully working backend & frontend integration

This project follows the architecture of professional chat apps like WhatsApp Web and Messenger.

⭐ Features

🔐 Authentication
-User Signup
-User Login
-JSON Web Token (JWT) based authentication

💬 Messaging
Real-time messages using Socket.IO
-Messages stored in MongoDB
-Chat rooms based on conversation IDs
-Auto-open new chats
-Automatic live updates (no refresh needed)

📝 Conversation System
Create new conversation with any user
-Conversation list sidebar
-Select chat to load messages
-Each user sees only their own chats

⚡ Real-Time Engine
-Users join conversation rooms
-Messages broadcast instantly to both users
-No page refresh required

🛠️ Tech Stack

Frontend

React + Vite
Socket.IO Client
useState, useEffect for UI state
LocalStorage for authentication
Clean and simple layout

Backend

Node.js + Express.js
MongoDB + Mongoose
Socket.IO Server
JWT Authentication
REST APIs

📂 Project Structure

messaging-app-fullstack/
│
├── backend/
│   ├── models/
│   │   ├── user.js
│   │   ├── conversation.js
│   │   └── message.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── convoRoutes.js
│   │   └── messageRoutes.js
│   ├── controllers/
│   ├── server.js
│   └── socket.io logic
│
└── frontend/
    ├── src/
    │   ├── Chat.jsx
    │   ├── Login.jsx
    │   ├── SignUp.jsx
    │   ├── main.jsx
    │   └── styles
    ├── package.json
    └── Vite config


🤝 Future Improvements

Typing Indicator
Online/offline status
Read receipts (double ticks)
Last message preview in sidebar
Group chats
Message deletion
Profile pictures
Pagination for chat history

Rachit Garg
Backend Developer | Full-stack Learner | System Design Explorer
