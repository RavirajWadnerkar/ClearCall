
import { Link } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
              ClearCall Terms of Service
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last Updated: March 1, 2025</span>
            </div>
            
            <div className="prose prose-blue max-w-none">
              <p>📖 Welcome to ClearCall! By using our services, you agree to these terms.</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing ClearCall, you agree to comply with these Terms of Service. 
                If you do not agree, please discontinue use immediately.
              </p>
              
              <h2>2. User Responsibilities</h2>
              <ul>
                <li><strong>Account Security:</strong> Users are responsible for securing their credentials.</li>
                <li><strong>Prohibited Use:</strong> No illegal, fraudulent, or harmful activities allowed.</li>
              </ul>
              
              <h2>3. AI-Generated Responses</h2>
              <ul>
                <li>Our AI-based voice complaint resolution is an automated system. We do not guarantee 100% accuracy.</li>
                <li>AI responses are based on retrieved company policies and trained models.</li>
              </ul>
              
              <h2>4. Payment & Subscription</h2>
              <ul>
                <li><strong>Subscription Plans:</strong> Pricing details are listed on the <Link to="/pricing" className="text-primary hover:underline">Pricing Page</Link>.</li>
                <li><strong>Refund Policy:</strong> Refunds are processed within 7 business days for eligible cases.</li>
              </ul>
            </div>
            
            <div className="mt-10 pt-6 border-t">
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p>
                  <strong>Contact Legal Team:</strong>
                  <a href="mailto:legal@clearcall.com" className="text-primary hover:underline ml-2">legal@clearcall.com</a>
                </p>
              </div>
              
              <div>
                <p className="font-medium">🔗 Connected To:</p>
                <div className="flex space-x-6 mt-2">
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  <Link to="/pricing" className="text-primary hover:underline">Pricing (Subscription Details)</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
