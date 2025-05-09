import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, X } from 'lucide-react';

const ChatPopup = ({ onClose }: { onClose: () => void }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const aiMessage = { sender: 'Claude', text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'Claude', text: 'Sorry, something went wrong. Please try again.' }]);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg rounded-lg w-80 ${isMinimized ? 'h-12' : 'h-96'} flex flex-col`}
      onClick={() => isMinimized && setIsMinimized(false)}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Live Chat - Powered by Claude</h3>
        <div className="flex space-x-2">
          <button onClick={(e) => { e.stopPropagation(); handleMinimize(); }} className="text-gray-500 hover:text-gray-700">
            <ArrowUpDown size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-500 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div
            ref={chatAreaRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            style={{ maxHeight: 'calc(100% - 4rem)' }}
          >
            {messages.length === 0 && (
              <p className="text-sm text-gray-500 text-center">Hi there! How can I assist you today?</p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}
              >
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200 flex items-center space-x-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <Button size="sm" onClick={handleSendMessage} className="bg-blue-500 text-white hover:bg-blue-600">
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPopup;