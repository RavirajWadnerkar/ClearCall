
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Who We Are</h1>
          <p className="text-lg text-gray-700 mb-8">
            ClearCall is an AI-powered voice-based customer support system designed to revolutionize how businesses handle customer complaints. 
            By using Retrieval-Augmented Generation (RAG), Spoken Language Understanding (SLU), and Text-to-Speech (TTS), 
            we offer instant, automated, and accurate responses to customer queries.
          </p>
          
          <h2 className="text-2xl font-bold mt-12 mb-6">🚀 Why Choose ClearCall?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered</h3>
                <p className="text-gray-600">Uses cutting-edge AI to resolve complaints in real-time.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <div>
                <h3 className="font-semibold text-lg">Fast & Efficient</h3>
                <p className="text-gray-600">No waiting time, instant voice-based support.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <div>
                <h3 className="font-semibold text-lg">Scalable</h3>
                <p className="text-gray-600">Can handle thousands of simultaneous queries.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <div>
                <h3 className="font-semibold text-lg">Secure</h3>
                <p className="text-gray-600">Compliant with GDPR & HIPAA standards.</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">📩 Get in Touch</h3>
            <p className="text-gray-700">
              Have any questions? Email us at <a href="mailto:contact@clearcall.com" className="text-primary hover:underline">contact@clearcall.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
