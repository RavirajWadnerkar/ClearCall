import { useState } from 'react';
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  XCircle,
  FileUp,
  Mic,
  Home, 
  MessageSquare, 
  BarChart, 
  Settings, 
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Link } from 'react-router-dom';

// Sample data for charts
const resolutionData = [
  { name: 'Jan', resolved: 65, escalated: 15 },
  { name: 'Feb', resolved: 59, escalated: 12 },
  { name: 'Mar', resolved: 80, escalated: 8 },
  { name: 'Apr', resolved: 81, escalated: 10 },
  { name: 'May', resolved: 76, escalated: 11 },
  { name: 'Jun', resolved: 85, escalated: 7 },
];

const pieData = [
  { name: 'Resolved by AI', value: 72 },
  { name: 'Escalated to Humans', value: 28 },
];

const COLORS = ['#0088FE', '#FF8042'];

const issueCategories = [
  { category: 'Billing Issues', count: 124, percentage: 35 },
  { category: 'Technical Problems', count: 98, percentage: 28 },
  { category: 'Product Inquiries', count: 65, percentage: 18 },
  { category: 'Account Management', count: 43, percentage: 12 },
  { category: 'Other', count: 25, percentage: 7 },
];

const Analytics = () => {
  const [activeView, setActiveView] = useState('overview');
  
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
            <Link to="/analytics" className="flex items-center px-4 py-3 bg-accent text-primary rounded-md font-medium">
              <BarChart className="h-5 w-5 mr-3" />
              Analytics
            </Link>
          </div>
          
          <div className="mt-10 space-y-1">
            <Link to="/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 lg:p-10 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-gray-500">Monitor AI performance & complaint trends</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button 
                variant={activeView === 'overview' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveView('overview')}
              >
                Overview
              </Button>
              <Button 
                variant={activeView === 'detailed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveView('detailed')}
              >
                Detailed Reports
              </Button>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Resolution Rate</p>
                  <h3 className="text-2xl font-bold">72%</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> 
                    +5.2% from last month
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
                  <p className="text-sm text-gray-500 mb-1">Total Complaints</p>
                  <h3 className="text-2xl font-bold">355</h3>
                  <p className="text-xs text-gray-500 mt-1">This month</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Policy Documents</p>
                  <h3 className="text-2xl font-bold">24</h3>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <FileUp className="h-3 w-3 mr-1" /> 
                    3 new this week
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Monthly Resolution Rates</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={resolutionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="resolved" stackId="a" fill="#4f46e5" name="Resolved by AI" />
                    <Bar dataKey="escalated" stackId="a" fill="#f97316" name="Escalated to Human" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Resolution Breakdown</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Common issues table */}
          <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Most Common Complaint Categories</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issueCategories.map((issue, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {issue.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-2">{issue.percentage}%</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${issue.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
