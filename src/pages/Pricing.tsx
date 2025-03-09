
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Choose the Right Plan for Your Business</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer flexible pricing based on your needs, whether you're a small business or an enterprise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-subtle border border-gray-100 p-8 flex flex-col h-full hover:shadow-glossy transition-shadow duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Basic</h3>
                <div className="mt-4 mb-4">
                  <span className="text-3xl font-bold">Free</span>
                </div>
                <p className="text-gray-500 text-sm">Perfect for small businesses just getting started</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">AI Voice Responses (50 queries/month)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">Basic Complaint Management</span>
                </li>
              </ul>
              
              <Button className="w-full mt-auto">Get Started</Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-subtle border border-primary/30 p-8 flex flex-col h-full relative hover:shadow-glossy transition-shadow duration-300">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold">Pro</h3>
                <div className="mt-4 mb-4">
                  <span className="text-3xl font-bold">$29.99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-gray-500 text-sm">For growing businesses that need more features</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">AI Voice Responses (500 queries/month)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">Advanced Analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">Priority Support</span>
                </li>
              </ul>
              
              <Button className="w-full mt-auto">Start 7-Day Trial</Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-subtle border border-gray-100 p-8 flex flex-col h-full hover:shadow-glossy transition-shadow duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <div className="mt-4 mb-4">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-gray-500 text-sm">For large organizations with specific requirements</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">Unlimited AI Queries</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">API Integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">Custom AI Models</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span className="text-gray-600">Dedicated Account Manager</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full mt-auto">Contact Sales</Button>
            </div>
          </div>
          
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Need a Custom Plan?</h3>
            <p className="text-gray-600 mb-6">
              Contact us at <a href="mailto:sales@clearcall.com" className="text-primary hover:underline">sales@clearcall.com</a> for tailored solutions.
            </p>
            <Button variant="outline">Talk to Sales</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
