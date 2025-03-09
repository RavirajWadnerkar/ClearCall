
import { Link } from 'react-router-dom';
import { Code, BookOpen, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-4">
              ClearCall Developer & User Documentation
            </h1>
            <p className="text-lg text-gray-600">
              📖 Learn how to integrate, use, and optimize ClearCall's AI-powered customer support system.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">1. API Documentation</h2>
              <div className="mb-6">
                <p className="font-semibold mb-2">🔗 Base API Endpoint:</p>
                <code className="bg-gray-100 text-primary p-2 rounded block mb-4">
                  https://api.clearcall.com/v1/
                </code>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Submit Complaint (Voice-to-Text)</h3>
                  <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                    <pre className="text-sm">
{`POST /submit-complaint
Content-Type: application/json
{
    "user_id": "12345",
    "voice_recording": "file_url"
}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Retrieve AI Response</h3>
                  <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                    <pre className="text-sm">
{`GET /get-response?user_id=12345`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">2. AI Model Breakdown</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Code className="h-5 w-5 mr-2 text-primary" />
                    SLU (Spoken Language Understanding)
                  </h3>
                  <p className="text-gray-700 pl-7">
                    Processes customer complaints into structured text.
                  </p>
                </div>
                
                <div>
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Code className="h-5 w-5 mr-2 text-primary" />
                    RAG (Retrieval-Augmented Generation)
                  </h3>
                  <p className="text-gray-700 pl-7">
                    Fetches relevant policy documents for AI-generated responses.
                  </p>
                </div>
                
                <div>
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Code className="h-5 w-5 mr-2 text-primary" />
                    TTS (Text-to-Speech)
                  </h3>
                  <p className="text-gray-700 pl-7">
                    Converts responses into human-like voice output.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <p>
                <strong>Support for Developers:</strong>
                <a href="mailto:dev@clearcall.com" className="text-primary hover:underline ml-2">dev@clearcall.com</a>
              </p>
            </div>
            
            <div>
              <p className="font-medium">🔗 Connected To:</p>
              <div className="flex space-x-6 mt-2">
                <Link to="/pricing" className="text-primary hover:underline">Pricing (API Subscription Plans)</Link>
                <Link to="/learn" className="text-primary hover:underline">Learn (How to Use AI Responses)</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
