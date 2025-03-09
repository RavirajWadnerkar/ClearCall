
import { useRef, useEffect } from 'react';
import { 
  Zap, 
  FileText, 
  Clock, 
  Database, 
  Lock, 
  Globe 
} from 'lucide-react';

interface Feature {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

const Features = () => {
  const features: Feature[] = [
    {
      icon: (props) => <Zap {...props} />,
      title: "Lightning-Fast Responses",
      description: "Our AI-powered system provides real-time responses to customer complaints with minimal latency."
    },
    {
      icon: (props) => <FileText {...props} />,
      title: "Retrieval-Augmented Generation",
      description: "ClearCall leverages your organization's policies to deliver accurate and consistent responses."
    },
    {
      icon: (props) => <Clock {...props} />,
      title: "24/7 Availability",
      description: "Provide round-the-clock customer support without increasing staffing costs or resources."
    },
    {
      icon: (props) => <Database {...props} />,
      title: "Comprehensive Analytics",
      description: "Gain valuable insights into customer issues, resolution rates, and support performance."
    },
    {
      icon: (props) => <Lock {...props} />,
      title: "Enterprise-Grade Security",
      description: "All customer data is processed with state-of-the-art encryption and security protocols."
    },
    {
      icon: (props) => <Globe {...props} />,
      title: "Seamless Integration",
      description: "Easily integrates with your existing customer support infrastructure and CRM systems."
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      featureElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap size={16} className="mr-2" />
            <span>Key Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Transforming Customer Support</h2>
          <p className="text-lg text-gray-600">
            ClearCall combines cutting-edge AI technologies to revolutionize how organizations handle customer complaints.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card relative p-8 rounded-2xl border border-gray-100 bg-white shadow-soft hover:shadow-glossy transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-primary/5 rounded-full" />
              
              <div className="w-14 h-14 mb-6 rounded-xl bg-primary/10 flex items-center justify-center relative">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
