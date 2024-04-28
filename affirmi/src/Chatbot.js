import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-1106",
          messages: [{ role: "user", content: query }],
        },
        {
          headers: {
            Authorization: `Bearer ${api_key}`,
            "Content-Type": "application/json",
          },
        }
      );
      const botResponse = result.data.choices[0].message.content;
      setResponse(botResponse);
      // Update chat log with user and bot messages
      const newChatLog = [
        ...chatLog,
        { role: "you", content: query },
        { role: "affirmi bot", content: botResponse }
      ];
      setChatLog(newChatLog);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };

  // Function to back out
  const back = () => {
    navigate("/MoodPage");
  };

  const cal = () => {
    navigate("/Calendar");
  };

  return (
    <div className="background">
      <div className="app-page">
        <div className="header">
          <button onClick={back}>home</button>
          <h1>affirmi</h1>
          <button onClick={cal}>log</button>
        </div>
        <form className="apiForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="How are you feeling?"
            value={query}
            onChange={handleInputChange}
            width="70px"
          />
          <button type="submit">send</button>
        </form>
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <div key={index} className={message.role}>
              <span>{message.role}: </span>
              {message.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
