import { useState, useRef, useEffect } from 'react';
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
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import API_BASE_URL from '@/config/api';

interface AudioRecorderState {
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  audioBlob: Blob | null;
  stream: MediaStream | null;
}

const VoiceComplaint = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<'idle' | 'uploading' | 'transcribing' | 'analyzing'>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const [recorderState, setRecorderState] = useState<AudioRecorderState>({
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    stream: null
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add effect to check authentication
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!userId || !isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use this feature",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate, toast]);

  useEffect(() => {
    // Cleanup function to stop recording and clear stream when component unmounts
    return () => {
      if (recorderState.mediaRecorder) {
        recorderState.mediaRecorder.stop();
      }
      if (recorderState.stream) {
        recorderState.stream.getTracks().forEach(track => track.stop());
      }
      if (recordingTimer) {
        clearInterval(recordingTimer);
      }
    };
  }, [recorderState.mediaRecorder, recorderState.stream, recordingTimer]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const retryWithBackoff = async (operation: () => Promise<any>, stage: string) => {
    let currentRetry = 0;
    const baseDelay = 1000; // Start with 1 second delay

    while (currentRetry < MAX_RETRIES) {
      try {
        return await operation();
      } catch (error) {
        currentRetry++;
        if (currentRetry === MAX_RETRIES) {
          throw error;
        }
        
        const delay = baseDelay * Math.pow(2, currentRetry - 1); // Exponential backoff
        toast({
          title: `Retrying ${stage}`,
          description: `Attempt ${currentRetry} of ${MAX_RETRIES}. Waiting ${delay/1000} seconds...`,
        });
        
        await sleep(delay);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setRecorderState(prev => ({ ...prev, audioBlob }));
      };

      setRecorderState({
        mediaRecorder,
        audioChunks,
        audioBlob: null,
        stream
      });

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingComplete(false);
      setAiResponse(null);

      // Start recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingTimer(timer);

      // Automatically stop after 60 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopRecording();
          toast({
            title: "Recording stopped",
            description: "Maximum recording time reached (60 seconds)",
          });
        }
      }, 60000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recorderState.mediaRecorder && recorderState.mediaRecorder.state === 'recording') {
      recorderState.mediaRecorder.stop();
      recorderState.stream?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setRecordingComplete(true);
      
      if (recordingTimer) {
        clearInterval(recordingTimer);
      }

      toast({
        title: "Recording stopped",
        description: `Recorded for ${recordingTime} seconds`,
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const generateUniqueFileName = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please log in again.",
        variant: "destructive",
      });
      navigate('/');
      return null;
    }
    
    return `voice_complaints/${userId}/${timestamp}_complaint.wav`;
  };

  const validateAudioBlob = (blob: Blob): boolean => {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (blob.size > maxSize) {
      toast({
        title: "Error",
        description: "Recording is too large. Maximum size is 10MB.",
        variant: "destructive",
      });
      return false;
    }

    // Check file type
    if (!blob.type.startsWith('audio/')) {
      toast({
        title: "Error",
        description: "Invalid file format. Only audio files are allowed.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast({
        title: "Authentication Error",
        description: "Please log in to submit a complaint",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (!recordingComplete || !recorderState.audioBlob) {
      toast({
        title: "Recording Required",
        description: "Please record your complaint before submitting",
        variant: "destructive",
      });
      return;
    }

    const fileName = generateUniqueFileName();
    if (!fileName) {
      return;
    }

    if (!validateAudioBlob(recorderState.audioBlob)) {
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);
    setProcessingStage('uploading');

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', recorderState.audioBlob, fileName);

      // Upload with retry mechanism
      await retryWithBackoff(async () => {
        const uploadPromise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(progress);
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
          };
          xhr.onerror = () => reject(new Error('Upload failed'));
          
          xhr.open('POST', `${API_BASE_URL}/upload`);
          xhr.send(formData);
        });

        return await uploadPromise;
      }, 'file upload');
      
      toast({
        title: "Upload Complete",
        description: "Processing your complaint...",
      });

      // Process with AI
      setProcessingStage('transcribing');
      await retryWithBackoff(async () => {
        const aiProcessingResponse = await fetch(`${API_BASE_URL}/api/process-voice-complaint`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true'
          },
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify({
            file_path: fileName
          }),
        });

        if (!aiProcessingResponse.ok) {
          const errorData = await aiProcessingResponse.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to process complaint: ${aiProcessingResponse.status}`);
        }

        const aiData = await aiProcessingResponse.json();
        setProcessingStage('analyzing');

        if (!aiData.success) {
          throw new Error(aiData.error || 'Failed to process complaint');
        }

        setAiResponse(aiData.response);

        // Show the transcript in a toast for verification
        toast({
          title: "Transcript Ready",
          description: aiData.transcript,
          duration: 5000,
        });
          
        toast({
          title: "Success",
          description: "Your complaint has been processed successfully",
        });

      }, 'AI processing');

    } catch (error) {
      console.error('Error submitting complaint:', error);
      setIsProcessing(false);
      setUploadProgress(0);
      setProcessingStage('idle');
      
      // More specific error messages based on error type
      let errorMessage = "Failed to submit complaint. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('status: 413')) {
          errorMessage = "Recording is too large. Please try a shorter message.";
        } else if (error.message.includes('network')) {
          errorMessage = "Network connection issue. Please check your internet and try again.";
        } else if (error.message.includes('process complaint')) {
          errorMessage = "AI processing failed. Our team will review it manually.";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
      setProcessingStage('idle');
    }
  };

  const handleRefresh = () => {
    setIsRecording(false);
    setRecordingTime(0);
    setRecordingComplete(false);
    setIsProcessing(false);
    setAiResponse(null);
    if (recordingTimer) {
      clearInterval(recordingTimer);
    }
    setRecorderState({
      mediaRecorder: null,
      audioChunks: [],
      audioBlob: null,
      stream: null
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/');
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
              {/* <Link to="/dashboard/upload" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
                <FileUp className="h-5 w-5 mr-3" />
                Upload Files
              </Link> */}
              <Link to="/voice-complaint" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
                <Mic className="h-5 w-5 mr-3" />
                Voice Support
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
        <div className="flex-1 p-6 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Voice Support</h1>
            <p className="text-gray-500 mb-6">Speak your request and get instant AI assistance</p>
            
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
                    <div className="space-y-4">
                      <Button 
                        onClick={handleSubmit} 
                        disabled={isProcessing}
                        className="w-full gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            {processingStage === 'uploading' && uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Processing...'}
                          </>
                        ) : (
                          <>
                            Submit Complaint
                            <Upload className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                      
                      {isProcessing && (
                        <div className="mt-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              <span className="text-primary font-medium">
                                {processingStage === 'uploading' && 'Uploading recording...'}
                                {processingStage === 'transcribing' && 'Transcribing audio...'}
                                {processingStage === 'analyzing' && 'Analyzing complaint...'}
                              </span>
                            </div>
                            
                            {processingStage === 'uploading' && uploadProgress > 0 && (
                              <div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                  <div 
                                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                                <p className="text-sm text-gray-500">{uploadProgress}% uploaded</p>
                              </div>
                            )}
                            
                            {(processingStage === 'transcribing' || processingStage === 'analyzing') && (
                              <div className="flex justify-center space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
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
                  <Button variant="outline" onClick={handleRefresh}>Submit New Complaint</Button>
                  <Button onClick={handleRefresh}>Accept Resolution</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VoiceComplaint;
