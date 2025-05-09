
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus, Mic, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Get Started with ClearCall</h1>
          <p className="text-lg text-gray-600 text-center mb-16">
            Learn how to use ClearCall in 3 simple steps
          </p>
          
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center md:mt-4 shrink-0">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">1️⃣ Sign Up & Log In</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Click on Sign Up to create an account.</p>
                  <p>Once logged in, access your dashboard.</p>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button asChild>
                    <a href="/signup">Sign Up Now</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/login">Login</a>
                  </Button>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-semibold mb-2">Pro Tip:</h3>
                  <p className="text-gray-600 text-sm">
                    Use a strong password that combines letters, numbers, and special characters
                    for enhanced security.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center md:mt-4 shrink-0">
                <Mic className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">2️⃣ Submit a Complaint</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Go to the Complaint Submission page.</p>
                  <p>Record your voice complaint or type it.</p>
                  <p>AI analyzes the query and retrieves relevant policies.</p>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-semibold mb-2">For Best Results:</h3>
                  <p className="text-gray-600 text-sm">
                    Speak clearly and provide specific details about your issue. This helps our AI
                    provide more accurate responses.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center md:mt-4 shrink-0">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">3️⃣ Receive Instant AI Response</h2>
                <div className="space-y-4 text-gray-600">
                  <p>AI generates a real-time voice response.</p>
                  <p>If needed, escalate the issue to a human representative.</p>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">Watch Demo Video</Button>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-semibold mb-2">Did You Know?</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI continuously learns from interactions, becoming more accurate over time.
                    You can provide feedback after each response to help improve the system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <Button size="lg" asChild>
              <a href="/signup">Create Your Account</a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
