
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
