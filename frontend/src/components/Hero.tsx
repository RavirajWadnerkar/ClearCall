
import { useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden py-24 sm:py-32 min-h-screen flex items-center bg-hero-pattern"
      style={{'--mouse-x': '0.5', '--mouse-y': '0.5'} as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(59, 130, 246, 0.15), transparent 30%)'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap size={16} className="mr-2" />
              <span>AI-Powered Voice Solution</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Transform Your</span>
              <span className="text-gradient">Customer Support</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              ClearCall uses cutting-edge AI to handle customer complaints with unparalleled efficiency and precision, providing real-time solutions through natural voice interactions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="btn-primary h-12 px-8 text-base font-medium">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="h-12 px-8 text-base font-medium">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Try Demo
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-primary mr-2" />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animate-delay-300">
            <div className="relative overflow-hidden rounded-3xl shadow-glossy bg-white p-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-blue-400/80" />
              
              <div className="aspect-video rounded-2xl overflow-hidden bg-accent/50 flex items-center justify-center">
                <div className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-gray-700">Voice Complaint Demo</p>
                  <p className="mt-2 text-sm text-gray-500">Click "Try Demo" to experience ClearCall</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-12 -bottom-8 -z-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -left-16 -top-8 -z-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
