import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, Home, ShoppingBag, MessageSquare, LogIn, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Clean Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex flex-col items-start justify-center">
                <div className="flex items-baseline leading-none">
                  <span className="text-xl md:text-2xl font-black tracking-tighter text-[#1a5c5c]">Ir-Shop</span>
                </div>
                <div className="relative w-full h-2 -mt-1">
                  <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10 5C30 15 70 15 90 5" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
                    <path d="M85 3L94 6L87 11" fill="#FFD700" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1a5c5c] transition-colors">
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link to="/games" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1a5c5c] transition-colors">
                <ShoppingBag size={16} />
                <span>Shop</span>
              </Link>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1a5c5c] transition-colors">
                <MessageSquare size={16} />
                <span>Feedback</span>
              </a>
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1a5c5c] transition-colors">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Link to="/login" className="text-[#1a5c5c] font-semibold text-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
              <p className="text-gray-600 text-sm">Create your Ir-Shop account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="+255 7XX XXX XXX (M-Pesa/Airtel)"
                />
                <p className="text-xs text-gray-500 mt-1.5">For order confirmations and M-Pesa/Airtel payments</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Create a strong password"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-[#1a5c5c] hover:bg-[#145454] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a5c5c] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Bottom Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-semibold text-[#1a5c5c] hover:text-[#145454] transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © 2026 Ir-Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Smartphone size={16} className="text-[#1a5c5c]" />
              <a href="#" className="text-sm font-medium text-[#1a5c5c] hover:text-[#145454] transition-colors">
                Download Ir-Shop App
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;

