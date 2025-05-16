import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, X } from 'lucide-react';

const ChatPopup = ({ onClose }: { onClose: () => void }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Add auto-scroll effect
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent empty messages
  
    // Add the user's message to the chat
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(''); // Clear the input field
  
    try {
      // Send the message to the backend (Flask)
      const response = await fetch('http://127.0.0.1:5000/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }
  
      // Get the response from the backend (GPT model)
      const data = await response.json();
      
      // If GPT response is successful, add it to the chat
      if (data.reply) {
        const aiMessage = { sender: 'Clara', text: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Handle cases where the response is not in the expected format
        setMessages((prev) => [
          ...prev,
          { sender: 'Clara', text: 'Sorry, something went wrong. Please try again.' },
        ]);
      }
  
    } catch (error) {
      // Handle errors (network issues, backend down, etc.)
      setMessages((prev) => [
        ...prev,
        { sender: 'Clara', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };  

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg rounded-lg w-80 ${isMinimized ? 'h-12' : 'h-96'} flex flex-col`}
      onClick={() => isMinimized && setIsMinimized(false)}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Live Chat with Clara - Powered by AI</h3>
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
        <>          <div
            ref={chatAreaRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth"
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