"use client"; // This is a client component
import Image from "next/image";
import { useState } from "react";


interface Message {
  text: string;
  sender: string;
}

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([]);
  
  const sendMessage = async (e: any) => {
    e.preventDefault()
    if (input.trim() === '') return

    const newMessages: any[] = [...messages, { text: input, sender: 'user' }]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })
      const data = await response.json()
      setMessages([...newMessages, { text: data.response, sender: 'bot' }])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='container'>
      <main className='main'>
        <h1 className='title'>CasualLM</h1>
        <div className='chatbox'>
          {messages.map((message, index) => (
            <div key={index} className={`message ${[message.sender]}`}>
              {message.text}
            </div>
          ))}

        </div>
        <form onSubmit={sendMessage} className='inputForm'>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className='input'
          />
          <button type="submit" className='button'>Send</button>
        </form>
      </main>
    </div>
  );
}
