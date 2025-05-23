import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight, User, Phone, Home, Mic, BarChart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LiveSupport = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai', timestamp: Date}[]>([
    {
      text: "Hello! I'm ClearCall AI Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    navigate('/');
  };
    const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: 'user', timestamp: new Date() },
    ]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // Send the message to the backend (Flask)
      const response = await fetch('http://127.0.0.1:5000/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      // Get the response from the GPT model
      const data = await response.json();
      
      if (data.reply) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.reply, sender: 'ai', timestamp: new Date() },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sorry, something went wrong. Please try again.', sender: 'ai', timestamp: new Date() },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'ai', timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-subtle h-[calc(100vh-4rem)] sticky top-16 border-r border-gray-100">          <div className="p-4">
          </div>
          
          <nav className="mt-6 px-4">
            <div className="space-y-1">
              <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link to="/voice-complaint" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">              <Mic className="h-5 w-5 mr-3" />
                Voice Support
              </Link>
              <Link to="/live-support" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
                <MessageSquare className="h-5 w-5 mr-3" />
                Live Support
              </Link>              <Link to="/analytics" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
                <BarChart className="h-5 w-5 mr-3" />
                Analytics
              </Link>
            </div>
            
            <div className="mt-10 space-y-1">
              <Link to="/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center space-x-4 bg-white shadow-subtle">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Live Support</h1>
              <p className="text-sm text-gray-500">ClearCall AI is ready to assist you</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 pb-0">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'ai' ? (
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-xs font-medium">ClearCall AI</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-xs font-medium">You</span>
                        </div>
                      )}
                      <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LiveSupport;
