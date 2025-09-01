import React, { useContext, useState, useRef, useEffect } from "react";
import "./main.css";
import { assets } from "../../assets/assets/assets.js";
import { Context } from "../../context/Context.jsx";
import TypingEffect from "./TypingEffect.jsx";
import LoadingDots from "../loadingstate/LoadingDots.jsx";
import Mode from "../modes/darkmode.jsx"

const Main = () => {
  const { response, onSent, input, setInput, loading, setRecentPrompts } =
    useContext(Context);
  const [lastPrompt, setLastPrompt] = useState("");
  const resultRef = useRef();
  const textareaRef = useRef();

  const handleSubmit = async (prompt) => {
    if (!prompt.trim()) return;
    setRecentPrompts(prev => [prompt, ...prev]);
    setLastPrompt(prompt); 
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await onSent(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    if (response || loading)
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response, loading]);

  return (
    <div className="main">
      <div className="nav">
        <p>🚀 NovaTalk</p>
        <div className="nav-right">
          <Mode />
          <img src={assets.user_icon} alt="User Icon" title="Profile" />
        </div>
      </div>

      <div className="main-container">
        {!response && !loading ? (
          <div className="greet-cards">
            <div className="greet">
              <p>
                <span>Hello, Bunny! 🌟</span>
              </p>
              <p>Ready to embark on a new adventure today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleSubmit(
                    "Imagine your dream destination. Where would it be?"
                  )
                }
              >
                <p>✈️ Imagine your dream destination. Where would it be?</p>
              </div>

              <div
                className="card"
                onClick={() =>
                  handleSubmit("What’s one skill you’d love to master this year?")
                }
              >
                <p>🎯 What’s one skill you’d love to master this year?</p>
              </div>

              <div
                className="card"
                onClick={() =>
                  handleSubmit(
                    "If you could talk to your future self, what would you ask?"
                  )
                }
              >
                <p>⏳ If you could talk to your future self, what would you ask?</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{lastPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="AI" />
              <div className="ai-response">
                {loading ? (
                  <LoadingDots />
                ) : (
                  <TypingEffect text={response} speed={20} />
                )}
              </div>
            </div>
            <div ref={resultRef} />
          </div>
        )}
      </div>

      <footer className="chat-input">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="💬 Type your message..."
          rows={1}
        />
        <button type="button" onClick={() => handleSubmit(input)}>
          ➤
        </button>
      </footer>
    </div>
  );
};

export default Main;