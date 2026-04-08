import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, isAuthenticated } = useAuth();
  
  const from = location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = await signup(formData.fullName, formData.email, formData.phone, formData.password);
    setIsLoading(false);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Signup failed');
    }
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
                  <span className="text-3xl font-black tracking-tighter text-[#FFD700]">Ir-Shop</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
              <p className="text-gray-600 text-sm">Create your Ir-Shop account</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 text-sm"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}

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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="+255"
                    disabled
                    className="w-20 px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm font-medium"
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="7XX XXX XXX"
                  />
                </div>
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
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  state={{ from }}
                  className="font-semibold text-[#1a5c5c] hover:text-[#145454] transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SignupPage;

