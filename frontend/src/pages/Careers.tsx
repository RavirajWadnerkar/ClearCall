
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Careers = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
              Join the Future of AI-Powered Customer Support
            </h1>
            <p className="text-lg text-gray-600">
              🚀 At ClearCall, we're transforming customer support with cutting-edge AI technology. 
              Join us in building next-gen voice AI systems that enhance user experience, reduce manual workloads, 
              and bring instant resolutions to complaints.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Open Positions</h2>
            
            <div className="space-y-10">
              <section>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  🔍 Engineering & AI Research
                </h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Machine Learning Engineer (NLP & RAG)</h4>
                    <p className="text-sm text-gray-500 mb-4">📍 Remote | Full-time</p>
                    <p className="text-gray-600 mb-4">
                      Design and optimize Retrieval-Augmented Generation (RAG) models for better AI responses.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="mailto:careers@clearcall.com?subject=Application: Machine Learning Engineer">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Full-Stack Developer (React + Flask)</h4>
                    <p className="text-sm text-gray-500 mb-4">📍 San Francisco, CA | Full-time</p>
                    <p className="text-gray-600 mb-4">
                      Develop and maintain front-end and back-end components for ClearCall.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="mailto:careers@clearcall.com?subject=Application: Full-Stack Developer">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  🎨 Design & User Experience
                </h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">UI/UX Designer</h4>
                    <p className="text-sm text-gray-500 mb-4">📍 Hybrid | Contract</p>
                    <p className="text-gray-600 mb-4">
                      Enhance the user journey for AI-powered interactions.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="mailto:careers@clearcall.com?subject=Application: UI/UX Designer">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  📈 Marketing & Growth
                </h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-lg mb-2">Digital Marketing Manager</h4>
                    <p className="text-sm text-gray-500 mb-4">📍 Remote | Full-time</p>
                    <p className="text-gray-600 mb-4">
                      Strategize and execute campaigns to expand ClearCall's reach.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="mailto:careers@clearcall.com?subject=Application: Digital Marketing Manager">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">📩 Apply Now</h3>
            <p className="mb-4">Send your resume to <a href="mailto:careers@clearcall.com" className="text-primary hover:underline">careers@clearcall.com</a></p>
            
            <h3 className="text-lg font-semibold mb-4 mt-6">🎯 Why Work With Us?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✔️</span>
                <span><strong>Innovate with AI</strong> – Work on groundbreaking voice AI & retrieval-based systems.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✔️</span>
                <span><strong>Flexible Work Culture</strong> – Remote and hybrid work options available.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✔️</span>
                <span><strong>Competitive Salary & Benefits</strong> – Health, bonuses, and stock options.</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <p className="font-medium">🔗 Connected To:</p>
              <div className="flex space-x-4 mt-2">
                <Link to="/blog" className="text-primary hover:underline">Blog (Company Culture)</Link>
                <Link to="/press" className="text-primary hover:underline">Press (Featured Stories)</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
