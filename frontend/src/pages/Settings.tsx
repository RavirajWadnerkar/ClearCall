import { useState } from 'react';
import { Globe, User, Lock, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  FileUp, 
  MessageSquare, 
  BarChart, 
  Settings as SettingsIcon, 
  LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Acme Inc.'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [language, setLanguage] = useState('english');
  const [voiceStyle, setVoiceStyle] = useState('neutral');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: "Success",
        description: "Password has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }
  };
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form to default values
      setProfileData({
        name: '',
        email: '',
        company: ''
      });
      
      toast({
        title: "Success",
        description: "Profile information has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreferencesSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Your preferences have been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-subtle h-[calc(100vh-4rem)] sticky top-16 border-r border-gray-100">
          <div className="p-4">
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
                    <h2 className="text-xl font-semibold mb-6">Account Information</h2>                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <Input 
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <Input 
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <Input 
                          value={profileData.company}
                          onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                      <div className="pt-4">
                        <Button type="submit">Update Profile</Button>
                      </div>
                    </form>
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
                        <Button onClick={handlePreferencesSave}>Save Preferences</Button>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
