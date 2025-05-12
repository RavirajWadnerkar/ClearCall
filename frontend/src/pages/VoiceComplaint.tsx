
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Upload, 
  Phone, 
  Home, 
  FileUp, 
  MessageSquare, 
  BarChart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const VoiceComplaint = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/');
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingComplete(true);
      toast({
        title: "Recording stopped",
        description: `Recorded for ${recordingTime} seconds`,
      });
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingComplete(false);
      setRecordingTime(0);
      setAiResponse(null);
      
      // Simulate recording time increase
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Automatically stop after 60 seconds
      setTimeout(() => {
        clearInterval(timer);
        if (isRecording) {
          setIsRecording(false);
          setRecordingComplete(true);
          toast({
            title: "Recording stopped",
            description: "Maximum recording time reached (60 seconds)",
          });
        }
      }, 60000);
      
      return () => clearInterval(timer);
    }
  };
  
  const handleSubmit = () => {
    if (!recordingComplete) {
      toast({
        title: "Error",
        description: "Please record your complaint first",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setAiResponse("Based on our company policy regarding service interruptions, you are eligible for a credit on your next bill. I've processed this automatically, and you'll see a $25 credit reflected on your next statement. Is there anything else I can help you with?");
      
      toast({
        title: "AI Response Ready",
        description: "Your complaint has been processed",
      });
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-subtle h-screen sticky top-0 border-r border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-2 text-xl font-medium">
            <span className="flex items-center">
              <span className="text-primary font-bold">Clear</span>
              <span className="font-semibold">Call</span>
            </span>
          </Link>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-1">
            <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            {/* <Link to="/dashboard/upload" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
              <FileUp className="h-5 w-5 mr-3" />
              Upload Files
            </Link> */}
            <Link to="/voice-complaint" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
              <Mic className="h-5 w-5 mr-3" />
              Voice Complaint
            </Link>
            <Link to="/live-support" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
              <MessageSquare className="h-5 w-5 mr-3" />
              Live Support
            </Link>
            <Link to="/analytics" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
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
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 lg:p-10 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Voice Complaint</h1>
          <p className="text-gray-500 mb-6">Speak your complaint and get instant AI assistance</p>
          
          <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 mb-6">
            <div className="text-center py-8">
              <div className="mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all ${
                  isRecording ? 'bg-red-100 animate-pulse' : 'bg-primary/10'
                }`}>
                  {isRecording ? 
                    <MicOff onClick={toggleRecording} className="h-12 w-12 text-red-500 cursor-pointer" /> : 
                    <Mic onClick={toggleRecording} className="h-12 w-12 text-primary cursor-pointer" />
                  }
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">
                {isRecording ? "Recording in progress..." : recordingComplete ? "Recording complete" : "Click to start recording"}
              </h2>
              
              {isRecording && (
                <p className="text-red-500 mb-4">Recording: {recordingTime}s</p>
              )}
              
              {recordingComplete && (
                <p className="text-gray-500 mb-4">Recording length: {recordingTime} seconds</p>
              )}
              
              <div className="max-w-sm mx-auto flex flex-col space-y-4">
                <Button 
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "default"}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
                
                {recordingComplete && (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isProcessing}
                    className="gap-2"
                  >
                    {isProcessing ? "Processing..." : "Submit Complaint"}
                    {!isProcessing && <Upload className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {aiResponse && (
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">AI Response</h3>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-gray-700">{aiResponse}</p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">Request Human Support</Button>
                <Button>Accept Resolution</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceComplaint;
