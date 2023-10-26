import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

 const handleSendMessage = () => {
   if (input.trim() === "") return;

   // Add the user's message and loading indicator to the list of messages
   setMessages((prevMessages) => [
     ...prevMessages,
     { text: input, user: true },
     { text: "Loading...", user: false, loading: true },
   ]);
   setInput("");

   axios({
     method: "post",
     url: "http://103.189.172.18:8010/api/prompt_route/",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/x-www-form-urlencoded",
     },
     data: `user_prompt=${encodeURIComponent(input)}`,
   })
     .then((response) => {
       // Replace the loading indicator with the actual response
       setMessages((prevMessages) => [
         ...prevMessages.slice(0, -1),
         {
           text: response.data, // Assuming your API response contains the text
           user: false,
           loading: false,
         },
       ]);
     })
     .catch((error) => {
       console.error("Error fetching response:", error);
       // Handle error and update messages accordingly
     });
 };

  // http://103.189.172.18:8010/api/prompt_route/
  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className={`message ${message.user ? "user" : "bot"}`}>
        {message.loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          message.text
        )}
      </div>
    ));
  };

  return (
    <div className="chatbot-container">
      <div className="header">AjnaLens Support</div>
      <div className="chat-messages">{renderMessages()}</div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
