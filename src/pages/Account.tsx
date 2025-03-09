
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, FileText, CreditCard, LogOut } from 'lucide-react';

const Account = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="bg-white shadow-subtle rounded-xl border border-gray-100 overflow-hidden">
            <Tabs defaultValue="profile" className="w-full">
              <div className="sm:flex">
                <div className="p-4 sm:p-6 sm:w-64 border-r border-gray-100 bg-gray-50">
                  <TabsList className="flex flex-col w-full bg-transparent h-auto space-y-1">
                    <TabsTrigger value="profile" className="justify-start w-full py-2 h-auto data-[state=active]:bg-primary/10">
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="justify-start w-full py-2 h-auto data-[state=active]:bg-primary/10">
                      <FileText className="h-5 w-5 mr-2" />
                      Documents
                    </TabsTrigger>
                    <TabsTrigger value="subscription" className="justify-start w-full py-2 h-auto data-[state=active]:bg-primary/10">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Subscription
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="justify-start w-full py-2 h-auto data-[state=active]:bg-primary/10">
                      <Settings className="h-5 w-5 mr-2" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button variant="ghost" className="justify-start w-full text-gray-600 hover:text-red-600 hover:bg-red-50">
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <TabsContent value="profile" className="mt-0">
                    <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          defaultValue="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          defaultValue="john.smith@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          defaultValue="Acme Inc."
                        />
                      </div>
                      <div className="pt-4">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="mt-0">
                    <h2 className="text-xl font-semibold mb-6">Uploaded Documents</h2>
                    <DocumentsTab />
                  </TabsContent>
                  
                  <TabsContent value="subscription" className="mt-0">
                    <h2 className="text-xl font-semibold mb-6">Subscription Management</h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Current Plan</p>
                          <p className="text-2xl font-bold">Pro Plan</p>
                          <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1 inline-block mt-2">
                            Active
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Next Billing Date</p>
                          <p className="font-medium">June 15, 2025</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
                        Cancel Subscription
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-0">
                    <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Change Password</h3>
                        <div className="space-y-4">
                          <input 
                            type="password" 
                            placeholder="Current Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <input 
                            type="password" 
                            placeholder="New Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <input 
                            type="password" 
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <Button>Update Password</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Documents tab component
const DocumentsTab = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Company Policy.pdf', size: '2.4 MB', date: 'May 12, 2023' },
    { id: 2, name: 'Terms of Service.docx', size: '1.8 MB', date: 'May 10, 2023' },
    { id: 3, name: 'Customer Guidelines.pdf', size: '3.1 MB', date: 'May 5, 2023' }
  ]);
  
  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  return (
    <div>
      <div className="mb-6">
        <Button className="w-full sm:w-auto">
          <FileText className="mr-2 h-4 w-4" />
          Upload New Document
        </Button>
      </div>
      
      {documents.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary hover:underline mr-4">View</button>
                    <button 
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(doc.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-gray-500">No documents uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default Account;
