import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import API_BASE_URL from '@/config/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password || !phone || !role) {
      ({
        title: 'Missing Fields',
        description: 'All fields are required to sign up.',
        variant: 'destructive',
      });
      return false;
    }
    if (password.length < 8) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log('Sending signup request with data:', { name, email, password, phone, role });
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, role }),
      });

      const data = await response.json();
      console.log('Received response from backend:', response.status, data);

      if (response.ok) {
        toast({ title: 'Success', description: 'Account created successfully!' });
        setIsPopupVisible(true);
      } else {
        toast({
          title: 'Signup Failed',
          description: data.error || 'Could not create account. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast({
        title: 'Server Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Register your company to get started with ClearCall
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow-subtle sm:rounded-xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="pl-10"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="pl-10"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full border-gray-300 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    required
                  >
                    <option value="" disabled>Select a role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="btn-primary w-full flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Sign up <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Link to Login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isPopupVisible} onOpenChange={setIsPopupVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Created Successfully</DialogTitle>
            <DialogDescription>
              Your account has been created. You can now log in to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => navigate('/login')}>Continue to Login</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Signup;
