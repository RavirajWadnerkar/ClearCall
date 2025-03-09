
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      content: "ClearCall has transformed our support system. Response times have decreased by 85% and customer satisfaction has increased dramatically.",
      author: "Sarah Johnson",
      position: "Customer Support Director",
      company: "TechSolutions Inc."
    },
    {
      content: "The voice-based AI solution is remarkably natural. Our customers can't tell they're interacting with an AI, and that's exactly what we wanted.",
      author: "Michael Chen",
      position: "CTO",
      company: "Global Retail Group"
    },
    {
      content: "We've reduced our support costs by 60% while improving our service quality. The ROI was evident within just two months of implementation.",
      author: "Emily Roberts",
      position: "Operations Manager",
      company: "FinanceHub"
    },
    {
      content: "ClearCall's ability to accurately understand and resolve complex customer issues has been nothing short of revolutionary for our business.",
      author: "David Wilson",
      position: "CEO",
      company: "ServicePro"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, isAnimating]);

  return (
    <section className="py-24 bg-clearcall-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Businesses across industries have transformed their customer support with ClearCall.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-white shadow-subtle hover:bg-primary hover:text-white transition-colors"
              disabled={isAnimating}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-white shadow-subtle hover:bg-primary hover:text-white transition-colors"
              disabled={isAnimating}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="overflow-hidden relative py-10">
            <div 
              className={`transition-all duration-500 ease-in-out flex ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="min-w-full px-12 sm:px-20"
                >
                  <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-soft relative">
                    <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10" />
                    
                    <blockquote className="text-lg sm:text-xl text-gray-700 mb-8 text-center italic">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="text-center">
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
