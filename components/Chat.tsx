'use client';
import { useChat } from 'ai/react';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
  
        <form onSubmit={handleSubmit}>
          <input
            className="p-4 fixed bottom-0 w-full max-w-md mb-8 border rounded-full border-gray-300 shadow-xl"
            value={input}
            placeholder="What can I help you with?"
            onChange={handleInputChange}
          />
        </form>
      </div>
    );
  }