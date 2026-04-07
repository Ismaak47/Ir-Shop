import { Search, ShoppingCart, Menu, User, ChevronDown, X, ChevronRight, Home, Plus, Minus, Trash2, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useAuth } from "../AuthContext";

export const Logo = () => (
  <div className="flex flex-col items-start justify-center px-1 group">
    <div className="flex items-baseline leading-none">
      <span className="text-xl md:text-2xl font-black tracking-tighter text-[#FFD700] drop-shadow-sm">Ir-Shop</span>
    </div>
    <div className="relative w-full h-3 -mt-1.5">
      <svg
        viewBox="0 0 100 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
      >
        <path
          d="M10 5C30 15 70 15 90 5"
          stroke="#FFD700"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M85 3L94 6L87 11"
          fill="#FFD700"
        />
      </svg>
    </div>
  </div>
);

interface HeaderProps {
  onMenuOpen: () => void;
  searchTerm?: string;
}

export const Header = ({ onMenuOpen, searchTerm = "" }: HeaderProps) => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-irshop-teal text-white sticky top-0 z-50 shadow-md">
        {/* Top Belt */}
        <div className="max-w-[1500px] mx-auto flex items-center gap-4 p-2">
          {/* Logo */}
          <Link to="/" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
            <Logo />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-irshop-accent transition-shadow relative">
            <input
              type="text"
              placeholder="Search Ir-Shop"
              className="flex-1 px-3 py-2 text-black outline-none bg-white min-w-0"
              defaultValue={searchTerm}
            />
            <button className="bg-irshop-accent hover:bg-irshop-accent-hover px-4 flex items-center justify-center text-black transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-1">
            <div className="relative">
              <div
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex items-center gap-1 transition-colors"
              >
                <User size={24} className="text-[#FFD700]" />
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-[10px] text-gray-200">Hello, {isAuthenticated ? user?.fullName?.split(' ')[0] : 'Guest'}</span>
                  <span className="font-bold text-[#FFD700] text-sm">Account</span>
                </div>
                <ChevronDown size={16} className="text-[#FFD700] hidden md:inline" />
              </div>
              <AnimatePresence>
                {showAccountDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg p-3 z-50 flex flex-col gap-2"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Signed in as</p>
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded font-bold text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login"
                          className="w-full px-4 py-2 bg-[#FFD700] text-black hover:bg-[#e6c200] rounded font-bold text-sm transition-colors text-center block"
                          onClick={() => setShowAccountDropdown(false)}
                        >
                          Sign in
                        </Link>
                        <Link 
                          to="/signup"
                          className="w-full px-4 py-2 bg-[#FFD700] text-black hover:bg-[#e6c200] rounded font-bold text-sm transition-colors text-center block"
                          onClick={() => setShowAccountDropdown(false)}
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              onClick={() => setIsCartOpen(true)}
              className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex items-center gap-1 transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={32} />
                <span className="absolute -top-1 -right-1 bg-irshop-teal text-irshop-accent rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs border-2 border-irshop-teal">{cartCount}</span>
              </div>
              <span className="font-bold mt-3 hidden md:inline">Cart</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="bg-irshop-teal-light relative">
          <div className="max-w-[1500px] mx-auto flex items-center px-2 py-1 gap-4 overflow-x-auto no-scrollbar">
            <div
              onClick={onMenuOpen}
              className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer font-bold whitespace-nowrap transition-colors"
            >
              <Menu size={20} />
              All
            </div>
            <ul className="flex items-center gap-4 text-sm font-medium whitespace-nowrap">
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Today's Deals</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Gift Cards</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Sell</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Registry</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Prime Video</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Customer Service</li>
            </ul>
          </div>
        </div>
      </header>
      <CartSidebar />
    </>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const categories = [
    "All Departments", "Arts & Crafts", "Automotive", "Baby", "Beauty & Personal Care", "Books",
    "Computers", "Digital Music"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[100]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-[260px] sm:w-[300px] max-w-[85vw] bg-white z-[101] overflow-y-auto shadow-2xl"
          >
            <div className="bg-irshop-teal text-white p-3 flex flex-col sticky top-0 z-10 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base flex items-center gap-2 pl-2 text-[#FFD700]">
                  <Menu size={18} className="text-[#FFD700]" />
                  Ir-Shop Menu
                </span>
                <button
                  onClick={onClose}
                  className="text-white hover:text-[#FFD700] transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="py-2">
              <div className="px-4 py-2.5 font-bold text-[14px] text-gray-900 border-b border-gray-100 mb-1 tracking-wide">Trending</div>
              <ul className="text-gray-600 pb-2 text-[13px] font-medium">
                <li className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors">Best Sellers</li>
                <li className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors">New Releases</li>
                <li className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors">Movers & Shakers</li>
              </ul>

              <div className="px-4 py-2.5 font-bold text-[14px] text-gray-900 border-b border-gray-100 my-1 tracking-wide">Digital Content & Devices</div>
              <ul className="text-gray-600 pb-2 text-[13px] font-medium">
                <li className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer flex justify-between items-center transition-colors">
                  Prime Video <ChevronRight size={14} className="text-gray-400" />
                </li>
                <li className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer flex justify-between items-center transition-colors">
                  Amazon Music <ChevronRight size={14} className="text-gray-400" />
                </li>
                <li className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer flex justify-between items-center transition-colors">
                  Echo & Alexa <ChevronRight size={14} className="text-gray-400" />
                </li>
              </ul>

              <div className="px-4 py-2.5 font-bold text-[14px] text-gray-900 border-b border-gray-100 my-1 tracking-wide">Shop By Department</div>
              <ul className="text-gray-600 pb-2 text-[13px] font-medium">
                {categories.map(cat => (
                  <li key={cat} className="px-5 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer flex justify-between items-center transition-colors">
                    {cat} <ChevronRight size={14} className="text-gray-400" />
                  </li>
                ))}
                <li className="px-5 py-2 hover:bg-gray-50 text-blue-600 cursor-pointer font-semibold transition-colors mt-1">See All</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileBottomNav = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const { cartCount, setIsCartOpen } = useCart();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 z-[60] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Link to="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors">
        <Home size={22} />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <div className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors cursor-pointer">
        <User size={22} />
        <span className="text-[10px] font-medium">Account</span>
      </div>
      <div onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors cursor-pointer relative">
        <ShoppingCart size={22} />
        <span className="absolute -top-1 -right-1 bg-irshop-teal text-irshop-accent rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]">{cartCount}</span>
        <span className="text-[10px] font-medium">Cart</span>
      </div>
      <button onClick={onMenuOpen} className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors">
        <Menu size={22} />
        <span className="text-[10px] font-medium">Menu</span>
      </button>
    </div>
  );
};

export const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartCount, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => {
    const priceNum = parseFloat(item.price.replace(/,/g, ''));
    return total + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-[260px] sm:w-[320px] max-w-[85vw] bg-white z-[101] flex flex-col shadow-2xl"
          >
            <div className="bg-irshop-teal text-white p-3 flex items-center justify-between shadow-sm">
              <span className="font-bold text-[15px] sm:text-base flex items-center gap-2 pl-1 text-[#FFD700]">
                <ShoppingCart size={18} className="text-[#FFD700]" />
                Your Cart ({cartCount})
              </span>
              <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-[#FFD700] transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-3 bg-gray-50">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                  <ShoppingCart size={36} className="text-gray-300 mb-3" />
                  <p className="text-sm">Your Ir-Shop Cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-white p-2.5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 items-start">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-1 border border-gray-100">
                      <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col h-full min-h-[56px] sm:min-h-[64px]">
                      <h4 className="font-semibold text-[11px] sm:text-[12px] leading-snug line-clamp-2 text-gray-800 mb-1">{item.title}</h4>
                      <span className="font-bold text-[13px] sm:text-sm text-gray-900 mb-2">
                        TZS {(parseFloat(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50 shadow-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-[11px] font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[10px] text-gray-500 uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold text-lg text-gray-900">TZS {totalAmount.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                  className="w-full bg-[#FFD700] hover:bg-[#FACC15] text-black py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_2px_8px_rgba(255,215,0,0.3)] hover:shadow-[0_4px_12px_rgba(255,215,0,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
