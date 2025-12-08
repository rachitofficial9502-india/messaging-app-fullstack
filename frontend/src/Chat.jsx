import { useEffect, useState } from "react";
import { io } from "socket.io-client"
const socket = io("http://localhost:3000");

export default function Chat() {

  if (!localStorage.getItem("token")) {
  window.location.href = "/";
    }


  const [ conversations, setConversations ] = useState([])
  const [ messages, setMessages ] = useState([])
  const [ selectedConversations, setSelectedConversations ] =  useState(null)
  const [ text, setText ] = useState("")
  const [ receiverId, setReceiverId ] = useState("")
  const [showNewChat, setShowNewChat] = useState(false)

  const userId = localStorage.getItem("userId")
  


  if (!userId) {
  window.location.href = "/";
  return null;
    } 

  async function fetchConversations() {
    const res = await fetch(`http://localhost:3000/api/conversations/${userId}`)
    const data = await res.json()
    console.log(data)
    setConversations(data)
  }

  async function fetchMessages(convoId) {
    const res = await fetch(`http://localhost:3000/api/messages/${convoId}`);
    const data = await res.json();
    console.log(data)
    setMessages(data)
  }

  useEffect( () => {
    fetchConversations()
  }, [])

  useEffect(() => {
  function handler(msg) {
    if (selectedConversations && msg.convoId === selectedConversations._id) {
      setMessages((prev) => [...prev, msg]);
    }
  }

  socket.on("receiveMessage", handler);

  return () => {
    socket.off("receiveMessage", handler);
  };
}, [selectedConversations]);

  

  async function sendMessage() {
    const body = {
      convoId: selectedConversations._id,
      senderId: userId,
      text: text
    }
    socket.emit("sendMessage", {
      convoId: selectedConversations._id,
      senderId: userId,
      text: text
    })
    setText("")
  }

  async function startNewChat() {
    if (!receiverId) return alert("Please enter receiver ID")
    

    const res = await fetch("http://localhost:3000/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: userId,
        receiverId: receiverId
      })
    })

    const convo = await res.json()

    setShowNewChat(false)
    setReceiverId("")

    setSelectedConversations(convo);
    fetchMessages(convo._id);


    fetchConversations()
  }

    

    const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "750px",
    background: "#f1f1f1",
    padding: "10px",
    borderRight: "1px solid gray",
  },
  conversationItem: {
    padding: "10px",
    marginBottom: "10px",
    background: "#fff",
    cursor: "pointer",
    border: "1px solid #ddd",
  },
  chatWindow: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
  },
  messageBubble: {
    background: "#e6e6e6",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "5px",
  },
  inputRow: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  button: {
    padding: "10px 20px",
  },
  newChatButton: {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
},

popupOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

popup: {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
},

popupInput: {
  padding: "10px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "1px solid #ccc"
},

popupActions: {
  display: "flex",
  justifyContent: "space-between"
}
};

  
    return (
        <div style={styles.container}>

          {/* LEFT SIDE - Conversations */}
          <div style={styles.sidebar}>
            <h3>Your Chats</h3>
            <button onClick={() => {
              setShowNewChat(true)
            }}>New Chat</button>

            {conversations.map((convo) => (
              <div
                key={convo._id}
                style={styles.conversationItem}
                onClick={() => {
                  setSelectedConversations(convo);
                  fetchMessages(convo._id);
                  socket.emit("joinRoom", convo._id)
                }}
              >
                Conversation: {convo._id}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Messages */}
          <div style={styles.chatWindow}>
            <div style={styles.messages}>
              {messages.map((msg) => (
                <div key={msg._id} style={styles.messageBubble}>
                  <b>{msg.senderId === userId ? "You" : "Them"}:</b> {msg.text}
                </div>
              ))}
            </div>

            {selectedConversations && (
              <div style={styles.inputRow}>
                <input
                  style={styles.input}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                />
                <button style={styles.button} onClick={sendMessage}>
                  Send
                </button>
              </div>
            )}
          </div>
                {showNewChat && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            

            <input 
              type="text"
              placeholder="Enter receiver userId"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              style={styles.popupInput}
            />

            <div style={styles.popupActions}>
              <button onClick={() => setShowNewChat(false)}>Cancel</button>
              <button onClick={startNewChat}>Start Chat</button>
            </div>
          </div>
        </div>
      )}

        </div>
      
    );

}