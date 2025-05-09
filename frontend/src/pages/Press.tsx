
import { Calendar, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Press = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
              ClearCall in the News
            </h1>
            <p className="text-lg text-gray-600">
              🌍 As seen in: TechCrunch, Forbes AI, The Verge, and more!
            </p>
          </div>
          
          <div className="mb-16">
            <div className="space-y-8 max-w-3xl mx-auto">
              <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl mb-2">
                  📰 ClearCall Raises $10M for AI-Driven Voice Support
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">February 20, 2025</span>
                  <span className="font-medium">TechCrunch</span>
                </div>
                <p className="text-gray-600 mb-4">
                  📖 Read how ClearCall is revolutionizing automated customer service with AI-driven voice recognition.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read full article <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl mb-2">
                  📰 The AI Revolution in Customer Support – ClearCall Leading the Way
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">January 15, 2025</span>
                  <span className="font-medium">Forbes AI</span>
                </div>
                <p className="text-gray-600 mb-4">
                  📖 Learn how ClearCall's RAG-based AI models are making customer interactions more human-like.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read full article <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </article>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3">📢 Media Inquiries?</h3>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:press@clearcall.com" className="text-primary hover:underline">
                    press@clearcall.com
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3">📩 Want to partner with us?</h3>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:partnerships@clearcall.com" className="text-primary hover:underline">
                    partnerships@clearcall.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="font-medium">🔗 Connected To:</p>
              <div className="flex justify-center space-x-6 mt-2">
                <Link to="/blog" className="text-primary hover:underline">Blog (Company Updates)</Link>
                <Link to="/careers" className="text-primary hover:underline">Careers (Company Growth & Expansion)</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Press;
