import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state (e.g., from checkout)
  const from = location.state?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect to the page user came from or home
    navigate(from);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#1a5c5c] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10 border border-gray-200">
            {/* Logo */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex flex-col items-center justify-center">
                <div className="flex items-baseline leading-none">
                  <span className="text-3xl font-black tracking-tighter text-[#1a5c5c]">Ir-Shop</span>
                </div>
                <div className="relative w-24 h-3 -mt-1">
                  <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10 5C30 15 70 15 90 5" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
                    <path d="M85 3L94 6L87 11" fill="#FFD700" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
              <p className="text-gray-600 text-sm">Access your Ir-Shop account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-end">
                <a href="#" className="text-sm font-medium text-[#1a5c5c] hover:text-[#145454] transition-colors">
                  Forgot Password?
                </a>
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Bottom Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup"
                  state={{ from }}
                  className="font-semibold text-[#1a5c5c] hover:text-[#145454] transition-colors"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;

