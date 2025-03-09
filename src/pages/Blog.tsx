
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
              Latest Insights in AI & Customer Support
            </h1>
            <p className="text-lg text-gray-600">
              📢 Stay updated with the latest trends, advancements, and news in AI-powered voice support, 
              customer experience, and automation.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 border-b pb-4">🔹 Featured Articles</h2>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors">
                    <a href="#">How AI is Transforming Customer Support</a>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">March 10, 2025</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5 min read</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    🔍 Discover how AI-powered voice assistants and chatbots are reshaping customer interactions.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </article>
              
              <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors">
                    <a href="#">RAG: The Future of Contextual AI Responses</a>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">March 5, 2025</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>7 min read</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    🔍 Learn about Retrieval-Augmented Generation (RAG) and how it improves AI-generated responses.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </article>
              
              <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors">
                    <a href="#">Top 5 Challenges in AI-Based Voice Recognition</a>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">February 28, 2025</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>6 min read</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    🔍 Understand the limitations and breakthroughs in spoken language understanding (SLU).
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </article>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">💡 Contribute to Our Blog!</h3>
            <p className="mb-4">
              Have insights on AI, automation, or tech trends? Email us at 
              <a href="mailto:blog@clearcall.com" className="text-primary hover:underline mx-1">blog@clearcall.com</a>.
            </p>
            
            <div className="mt-6">
              <p className="font-medium">🔗 Connected To:</p>
              <div className="flex justify-center space-x-6 mt-2">
                <Link to="/careers" className="text-primary hover:underline">Careers (AI Research & Development)</Link>
                <Link to="/documentation" className="text-primary hover:underline">Documentation (Deep Dive into AI Models)</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
