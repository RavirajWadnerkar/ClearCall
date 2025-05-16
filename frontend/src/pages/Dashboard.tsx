import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileUp, 
  Mic, 
  MessageSquare, 
  BarChart, 
  Settings, 
  LogOut,
  Upload,
  CheckCircle,
  Clock,
  TrendingUp,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isAuthenticated } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [completedCalls, setCompletedCalls] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = isAuthenticated();
    console.log('Is user logged in:', isLoggedIn);
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    fetch('http://localhost:5000/api/completed-calls') 
      .then(response => response.json())
      .then(data => {
        setCompletedCalls(data.length); // Count the number of completed calls
      })
      .catch(error => {
        console.error('Error fetching completed calls:', error);
      });

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
  
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });      const data = await response.json();
      if (response.ok) {
        console.log('File uploaded successfully:', data.message);
        setSelectedFile(null); // Clear the selected file after upload
        
        toast({
          title: "Success",
          description: "Your file has been uploaded successfully",
          variant: "default",
        });
        
        await getFileCount();
      } else {
        console.error('Error uploading file:', data.error);
        toast({
          title: "Error",
          description: data.error || "Failed to upload file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFileCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/file-count');
      const data = await response.json();
      setFileCount(data.file_count);
    } catch (error) {
      console.error('Error fetching file count:', error);
    }
  };
  
  useEffect(() => {
    getFileCount();
  }, []); // Only run once on component mount
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-subtle h-[calc(100vh-4rem)] sticky top-16 border-r border-gray-100">          <div className="p-4">
          </div>
          <nav className="mt-6 px-4">
            <div className="space-y-1">
              <Link to="/dashboard" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link to="/voice-complaint" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
                <Mic className="h-5 w-5 mr-3" />
                Voice Support
              </Link>              <Link to="/live-support" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
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
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24">
            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-3">Welcome to ClearCall</h1>
              <p className="text-gray-500">AI-powered voice-based customer support at your fingertips</p>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Requests Handled</p>
                    <h3 className="text-2xl font-bold">{completedCalls}</h3>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> 
                      This month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Avg. Response Time</p>
                    <h3 className="text-2xl font-bold">3.5s</h3>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> 
                      0.3s faster than target
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Documents Uploaded</p>
                    <h3 className="text-2xl font-bold">{fileCount}</h3>
                    <p className="text-xs text-gray-500 mt-1">Active policies</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick actions */}
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Voice Support</h3>
                <p className="text-gray-500 mb-4">Submit a voice request for instant AI resolution</p>
                <Link to="/voice-complaint">
                  <Button variant="outline" className="w-full">Submit Request</Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
                <p className="text-gray-500 mb-4">Monitor AI performance and request trends</p>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full">Analytics Dashboard</Button>
                </Link>
              </div>
            </div>
            
            {/* Upload section */}
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">Upload Policy Documents</h2>
                <p className="text-gray-500 mb-6">Upload your company policy documents to power the AI</p>
                
                <div className="max-w-xs mx-auto">
                  <label className="block">
                    <span className="sr-only">Choose file</span>
                    <input 
                      type="file" 
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </label>
                  
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-accent rounded-md text-sm">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  <Button 
                    onClick={handleUpload} 
                    className="w-full mt-4"
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;