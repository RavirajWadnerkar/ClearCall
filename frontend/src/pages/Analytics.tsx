import { useEffect, useState } from 'react';
import axios from 'axios';
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
  LogOut,
  Phone
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
import Navbar from '@/components/Navbar';

const COLORS = ['#0088FE', '#FF8042'];

const issueCategories = [
  { category: 'Billing Issues', count: 124, percentage: 35 },
  { category: 'Technical Problems', count: 98, percentage: 28 },
  { category: 'Product Inquiries', count: 65, percentage: 18 },
  { category: 'Account Management', count: 43, percentage: 12 },
  { category: 'Other', count: 25, percentage: 7 },
];

const Analytics = () => {
  const [pieData, setPieData] = useState([
    { name: 'Resolved by AI', value: 0 },
    { name: 'Escalated to Humans', value: 0 }
  ]);
  const [resolutionData, setResolutionData] = useState([]);
  const [activeView, setActiveView] = useState('overview');
  const [fileCount, setFileCount] = useState(0);
  const [completedCalls, setCompletedCalls] = useState(0);
  const [humanEscalations, setHumanEscalations] = useState([]);
  const [resolutionRate, setResolutionRate] = useState(0);

useEffect(() => {
  // Trigger sync
  axios.post('http://localhost:5000/api/sync-twilio-inquiries')
    .then(res => console.log('Twilio sync complete:', res.data))
    .catch(err => console.error('Twilio sync failed:', err));

  // Fetch pie chart
  axios.get('http://localhost:5000/api/complaint-summary')
    .then(res => {
      const { ai_resolved, human_escalated } = res.data;
      setPieData([
        { name: 'Resolved by AI', value: ai_resolved },
        { name: 'Escalated to Humans', value: human_escalated }
      ]);
    })
    .catch(err => console.error('Pie chart error:', err));

  // Fetch bar chart
  axios.get('http://localhost:5000/api/monthly-summary')
    .then(res => setResolutionData(res.data))
    .catch(err => console.error('Bar chart error:', err));

  // Fetch resolution rate
  axios.get('http://localhost:5000/api/resolution-rate')
    .then(res => setResolutionRate(res.data.resolution_rate))
    .catch(err => console.error('Error fetching resolution rate:', err));

  // Fetch human escalations
    axios.get('http://localhost:5000/api/human-escalations')
  .then((res) => {
    setHumanEscalations(res.data);
  })
  .catch((err) => {
    console.error('Error fetching human escalation data:', err);
  });

  // Fetch file count
  axios.get('http://localhost:5000/file-count')
    .then(res => setFileCount(res.data.file_count))
    .catch(err => console.error('File count error:', err));

  // Fetch completed calls
  axios.get('http://localhost:5000/api/completed-calls')
    .then(res => setCompletedCalls(res.data.length))
    .catch(err => console.error('Completed calls error:', err));
}, []);

  
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
              <Link to="/voice-complaint" className="flex items-center px-4 py-3 text-gray-600 hover:bg-accent hover:text-primary rounded-md transition-colors">
                <Mic className="h-5 w-5 mr-3" />
                Voice Support
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
        <div className="flex-1 p-6 lg:p-10">
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
                {/* <Button 
                  variant={activeView === 'detailed' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setActiveView('detailed')}
                >
                  Detailed Reports
                </Button> */}
              </div>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Resolution Rate</p>
                    <h3 className="text-2xl font-bold">{resolutionRate}%</h3>
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
                    <p className="text-sm text-gray-500 mb-1">Total Requests</p>
                    <h3 className="text-2xl font-bold">{completedCalls}</h3>
                    <p className="text-xs text-green-600 items-center mt-1"><TrendingUp className="h-3 w-3 mr-1" />This month</p>
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
                    <h3 className="text-2xl font-bold">{fileCount}</h3>
                      <p className="text-xs text-gray-500 mt-1">Active policies</p>
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
              <h3 className="text-lg font-semibold mb-4">Escalation to Human</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date and Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {humanEscalations.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.caller_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(entry.initiated_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.reason}
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
    </div>
  );
};

export default Analytics;
