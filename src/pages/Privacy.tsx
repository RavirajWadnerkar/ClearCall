
import { Link } from 'react-router-dom';
import { Calendar, Mail, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
              Your Privacy Matters at ClearCall
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last Updated: March 1, 2025</span>
            </div>
            
            <div className="prose prose-blue max-w-none">
              <h2>1. What Information We Collect</h2>
              <ul>
                <li>
                  <span className="text-primary mr-2">✔️</span>
                  <strong>Personal Data:</strong> Name, email, company details.
                </li>
                <li>
                  <span className="text-primary mr-2">✔️</span>
                  <strong>Usage Data:</strong> Logs, AI responses, complaint interactions.
                </li>
              </ul>
              
              <h2>2. How We Use Your Data</h2>
              <ul>
                <li>
                  <span className="text-primary mr-2">🔹</span>
                  To process AI-based complaints efficiently.
                </li>
                <li>
                  <span className="text-primary mr-2">🔹</span>
                  To improve voice recognition accuracy.
                </li>
                <li>
                  <span className="text-primary mr-2">🔹</span>
                  To enhance user experience and personalize support.
                </li>
              </ul>
              
              <h2>3. Data Storage & Security</h2>
              <ul>
                <li>
                  <span className="text-primary mr-2">🛡️</span>
                  All data is encrypted and stored securely on AWS servers.
                </li>
                <li>
                  <span className="text-primary mr-2">🚫</span>
                  We do not sell personal data to third parties.
                </li>
              </ul>
            </div>
            
            <div className="mt-10 pt-6 border-t">
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p>
                  <strong>Privacy Inquiries?</strong>
                  <a href="mailto:privacy@clearcall.com" className="text-primary hover:underline ml-2">privacy@clearcall.com</a>
                </p>
              </div>
              
              <div>
                <p className="font-medium">🔗 Connected To:</p>
                <div className="flex space-x-6 mt-2">
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
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

export default Privacy;
