import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import AjnaLenslogo from "../AjnaLenslogo.png";
import chatbot from "../chatbot.svg";
import crossNew from "../crossNew.svg";
import send from "../send.png";
import loaderSpinning from "./loaderSpinning.gif";

const Chatbot = () => {
  const [chatbox, setChatbox] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(55);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
    setInputHeight(55);
  };

  const handleSendChat = () => {
    if (!userMessage.trim()) return;
    sendMessage(userMessage, "outgoing");
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && userMessage.trim()) {
      e.preventDefault();
      sendMessage(userMessage, "outgoing");
    }
  };

  const sendMessage = (messageText, type) => {
    const newMessage = { text: messageText, type };
    setChatbox([...chatbox, newMessage]);
    setUserMessage("");
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const responseMessage = {
        text: "This is the response.",
        type: "incoming",
        text2: "This is outgoing",
        type2: "outgoing",
      };
      setChatbox([...chatbox, responseMessage]);
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }, 2000);
  };

  useEffect(() => {
    if (window.innerWidth <= 800) {
      setShowChatbot(false);
    }
  }, []);

  const chatboxRef = useRef();

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  console.log("dd", chatbox);
  return (
    <div className="chatbot-container">
      <div
        className="chat-trigger chatbot"
        onClick={toggleChatbot}
        style={{
          width: "100px",
          position: "fixed",
          right: "100px",
        }}
      >
        <img
          src={chatbot}
          alt="chatbotImg"
          style={{
            width: "100%",
          }}
        />
      </div>

      {showChatbot && (
        <div className={`chatbot ${showChatbot ? "show-chatbot" : ""}`}>
          <header>
            <h4>AjnaLens Support</h4>
            <span
              className="close-btn material-symbols-outlined"
              onClick={() => setShowChatbot(false)}
            >
              <img src={crossNew} alt="cross" />
            </span>
          </header>
          <ul className="chatbox" ref={chatboxRef}>
            {chatbox.map((message, index) => (
              <li
                key={index}
                className={`chat ${
                  message.type === "outgoing" ? "outgoing" : "incoming"
                }`}
              >
                {message.type === "outgoing" ? (
                  <div className="outgoing-message">
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={AjnaLenslogo}
                      alt="AjnaLenslogo"
                      className="image-logo"
                    />
                    <p>{message.text}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="chat-input">
            <input
              placeholder="Enter a message..."
              spellCheck="false"
              required
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyPress}
              style={{
                height: "26px",
                width: "100%",
                border: "2px solid #efefef",
                padding: "8px",
                outline: "none",
              }}
            />

            {isThinking ? (
              <img
                src={loaderSpinning}
                alt="loaderSpinning"
                style={{ width: "72px", height: "50px" }}
              />
            ) : (
              <span
                className="material-symbols-rounded"
                onClick={handleSendChat}
              >
                <img
                  src={send}
                  alt="send"
                  style={{ width: "30px", height: "35px" }}
                />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
