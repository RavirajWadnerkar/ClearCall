
import { useState } from 'react';
import { Globe, User, Lock, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  FileUp, 
  MessageSquare, 
  BarChart, 
  Settings as SettingsIcon, 
  LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [language, setLanguage] = useState('english');
  const [voiceStyle, setVoiceStyle] = useState('neutral');
  const navigate = useNavigate();
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    navigate('/');
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
            <Link to="/settings" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
              <SettingsIcon className="h-5 w-5 mr-3" />
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
      <div className="flex-1 p-6 lg:p-10 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500 mb-6">Personalize your ClearCall experience</p>
          
          <div className="bg-white rounded-xl shadow-subtle border border-gray-100 overflow-hidden">
            <Tabs defaultValue="account" className="w-full">
              <div className="border-b border-gray-100">
                <TabsList className="p-0 h-14 bg-white">
                  <TabsTrigger 
                    value="account" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-6"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-6"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preferences" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-6"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Voice & Language
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="account" className="mt-0">
                  <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input defaultValue="John Smith" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input defaultValue="john.smith@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <Input defaultValue="Acme Inc." />
                    </div>
                    <div className="pt-4">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <Input 
                        type="password" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <Input 
                        type="password" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <Input 
                        type="password" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="pt-4">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-0">
                  <h2 className="text-xl font-semibold mb-6">Voice & Language Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Language</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {['english', 'spanish', 'french', 'german', 'japanese', 'chinese'].map((lang) => (
                          <div 
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`p-3 border rounded-lg cursor-pointer flex items-center space-x-2 ${
                              language === lang ? 'border-primary bg-primary/5' : 'border-gray-200'
                            }`}
                          >
                            <Globe className="h-4 w-4" />
                            <span className="capitalize">{lang}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">AI Voice Style</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          {id: 'neutral', name: 'Neutral'},
                          {id: 'friendly', name: 'Friendly'},
                          {id: 'professional', name: 'Professional'},
                          {id: 'energetic', name: 'Energetic'}
                        ].map((voice) => (
                          <div 
                            key={voice.id}
                            onClick={() => setVoiceStyle(voice.id)}
                            className={`p-3 border rounded-lg cursor-pointer flex items-center space-x-2 ${
                              voiceStyle === voice.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                            }`}
                          >
                            <Mic className="h-4 w-4" />
                            <span>{voice.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
