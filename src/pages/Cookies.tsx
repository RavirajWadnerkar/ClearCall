
import { Link } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
              How ClearCall Uses Cookies
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last Updated: March 1, 2025</span>
            </div>
            
            <div className="prose prose-blue max-w-none">
              <h2>🍪 What Are Cookies?</h2>
              <p>
                Cookies are small files stored on your browser to enhance site experience.
              </p>
              
              <h2>1. Types of Cookies We Use</h2>
              <ul>
                <li>
                  <span className="text-primary mr-2">✅</span>
                  <strong>Essential Cookies:</strong> Required for authentication and security.
                </li>
                <li>
                  <span className="text-primary mr-2">✅</span>
                  <strong>Performance Cookies:</strong> Improve AI response speed.
                </li>
                <li>
                  <span className="text-primary mr-2">✅</span>
                  <strong>Analytics Cookies:</strong> Track user interactions for better AI improvements.
                </li>
              </ul>
              
              <h2>2. Managing Cookies</h2>
              <p>
                You can control cookies via browser settings.
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t">
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p>
                  <strong>Cookie Questions?</strong>
                  <a href="mailto:cookies@clearcall.com" className="text-primary hover:underline ml-2">cookies@clearcall.com</a>
                </p>
              </div>
              
              <div>
                <p className="font-medium">🔗 Connected To:</p>
                <div className="flex space-x-6 mt-2">
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
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

export default Cookies;
