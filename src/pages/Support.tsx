
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Need Help? We're Here for You!</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            If you need any assistance, feel free to reach out through any of these channels:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-subtle border border-gray-100 flex items-start">
              <Mail className="h-8 w-8 text-primary mr-4 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600 mb-4">We usually respond within 24 hours</p>
                <a href="mailto:support@clearcall.com" className="text-primary hover:underline font-medium">
                  support@clearcall.com
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-subtle border border-gray-100 flex items-start">
              <Phone className="h-8 w-8 text-primary mr-4 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 mb-4">Available Monday - Friday, 9 AM - 5 PM (PST)</p>
                <a href="tel:+18005550123" className="text-primary hover:underline font-medium">
                  +1 (800) 555-0123
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-subtle border border-gray-100 flex items-start">
              <MessageSquare className="h-8 w-8 text-primary mr-4 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Available from 9 AM - 9 PM (PST)</p>
                <Button size="sm">Start Chat</Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-subtle border border-gray-100 flex items-start">
              <MapPin className="h-8 w-8 text-primary mr-4 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Office Address</h3>
                <p className="text-gray-600">
                  123 ClearCall Lane, Suite 500<br />
                  San Francisco, CA 94105, USA
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-subtle border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-lg mb-2">1️⃣ How do I reset my password?</h3>
                <p className="text-gray-600">Click on 'Forgot Password' on the login page.</p>
              </div>
              
              <div className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-lg mb-2">2️⃣ Where are my uploaded documents stored?</h3>
                <p className="text-gray-600">Securely stored in AWS S3, encrypted for privacy.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">3️⃣ How do I upgrade my plan?</h3>
                <p className="text-gray-600">Visit the <a href="/pricing" className="text-primary hover:underline">Pricing</a> page and select your preferred plan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
