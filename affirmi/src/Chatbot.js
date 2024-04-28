import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [response, setResponse] = useState('');
  const [query, setQuery] = useState('');

  const api_key = process.env.REACT_APP_API_KEY;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo-1106",
        messages: [
            { role: "user", content: query }
            
        ]
        
      }, {
        headers: {
          'Authorization': `Bearer ${api_key}`,
          'Content-Type': 'application/json'
        }
      });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleInputChange} />
        <button type="submit">Ask</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
};

export default Chatbot;