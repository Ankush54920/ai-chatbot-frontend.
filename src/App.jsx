import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  const [nickname, setNickname] = useState("");
  const [chatting, setChatting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, message: input })
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setInput("");
  };

  if (!chatting) {
    return (
      <div className="flex flex-col items-center text-white text-lg">
        <h1 className="text-3xl mb-4">🎉 Welcome!</h1>
        <input
          type="text"
          placeholder="Enter your nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          onClick={() => nickname && setChatting(true)}
          className="mt-4 bg-green-500 px-4 py-2 rounded"
        >
          Start Chat 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl mb-2">Hi {nickname} 👋</h2>
      <div className="h-96 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 rounded">Send</button>
      </div>
    </div>
  );
}

export default App;
