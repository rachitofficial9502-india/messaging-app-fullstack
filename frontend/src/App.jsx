import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Chat from "./Chat";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

