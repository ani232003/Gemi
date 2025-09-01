/* eslint-disable react-refresh/only-export-components */
import { useState, createContext } from "react";
import { generate } from "../config/novo.js";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [recentPrompts, setRecentPrompts] = useState([]);

  const onSent = async (prompt) => {
    const userMessage = { role: "user", text: prompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setResponse("");
    setLoading(true);

    let fullResponse = "";
    try {
      await generate(prompt, (chunk) => {
        setResponse((prev) => prev + chunk); 
        fullResponse += chunk;              
      });
    } catch (err) {
      console.error(err);
      setResponse("Oops! Something went wrong.");
    } finally {
      // Always use fullResponse for storing final data
      const geminiMessage = { role: "gemini", text: fullResponse };
      setChatHistory((prev) => [...prev, geminiMessage]);

      // Save to recentPrompts only if prompt is valid
      if (prompt && prompt.trim() !== "") {
        setRecentPrompts((prev) => [
          { prompt, response: fullResponse },
          ...prev.filter((p) => p.prompt && p.prompt !== prompt), // avoid duplicates
        ]);
      }

      setLoading(false);
    }
  };

  const startNewChat = () => {
    setChatHistory([]);
    setResponse("");
  };

  return (
    <Context.Provider
      value={{
        response,
        setResponse,
        input,
        setInput,
        loading,
        onSent,
        chatHistory,
        setChatHistory,
        recentPrompts,
        setRecentPrompts,
        startNewChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
