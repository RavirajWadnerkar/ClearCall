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
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isAuthenticated } from '@/lib/utils';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    // Simulate successful upload after 2 seconds
    setTimeout(() => {
      setSelectedFile(null);
    }, 2000);
  };
  
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
            <Link to="/dashboard" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/dashboard/upload" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
              <FileUp className="h-5 w-5 mr-3" />
              Upload Files
            </Link>
            <Link to="/voice-complaint" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
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
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto pt-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to ClearCall</h1>
            <p className="text-gray-500">AI-powered voice-based customer support at your fingertips</p>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Complaints Resolved</p>
                  <h3 className="text-2xl font-bold">28</h3>
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
                  <h3 className="text-2xl font-bold">1.8s</h3>
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
                  <h3 className="text-2xl font-bold">12</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
              <p className="text-gray-500 mb-4">Upload company policies to improve AI responses</p>
              <Link to="/dashboard/upload">
                <Button variant="outline" className="w-full">Upload Files</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Voice Complaint</h3>
              <p className="text-gray-500 mb-4">Submit a voice complaint for instant AI resolution</p>
              <Link to="/voice-complaint">
                <Button variant="outline" className="w-full">Submit Complaint</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
              <p className="text-gray-500 mb-4">Monitor AI performance and complaint trends</p>
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
                  disabled={!selectedFile}
                >
                  Upload
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