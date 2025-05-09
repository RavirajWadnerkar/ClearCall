import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User, FileUp, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check login status on mount and when location changes
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    if (location.pathname !== '/login') {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsAccountMenuOpen(false);

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });

    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-white/90 backdrop-blur-sm shadow-subtle' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-medium">
            <span className="flex items-center">
              <span className="text-primary font-bold">Clear</span>
              <span className="font-semibold">Call</span>
              <Phone className="inline-block ml-1.5 h-4 w-4 text-primary" />
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/about" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-accent transition-colors">
              About Us
            </Link>
            <Link to="/pricing" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-accent transition-colors">
              Pricing
            </Link>
            <Link to="/support" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-accent transition-colors">
              Support
            </Link>
            <Link to="/learn" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-accent transition-colors">
              Learn
            </Link>
          </div>

          {/* Auth Buttons or Account Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                >
                  <User size={18} />
                  <span>My Account</span>
                </Button>
                
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <User className="inline-block mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <FileUp className="inline-block mr-2 h-4 w-4" />
                      Upload Documents
                    </Link>
                    <Link 
                      to="/account?tab=settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <Settings className="inline-block mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="inline-block mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium" 
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '60px' }}>
          <div className="container mx-auto px-4 pt-8 pb-8 flex flex-col space-y-4">
            <Link 
              to="/about" 
              className="px-4 py-3 rounded-md text-base font-medium hover:bg-accent" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/pricing" 
              className="px-4 py-3 rounded-md text-base font-medium hover:bg-accent" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/support" 
              className="px-4 py-3 rounded-md text-base font-medium hover:bg-accent" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              to="/learn" 
              className="px-4 py-3 rounded-md text-base font-medium hover:bg-accent" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Learn
            </Link>
            
            <div className="flex flex-col space-y-2 pt-4">
              {isLoggedIn ? (
                <>
                  <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">My Account</Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center text-red-600"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center" 
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full justify-center">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
