import { Search, ShoppingCart, Menu, User, ChevronDown, X, ChevronRight, Home, LogOut, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCart, removeFromCart, updateCartQuantity, CartItem } from "../lib/store";

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
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchInput, setSearchInput] = useState(searchTerm);
  const navigate = useNavigate();

  const updateCartState = () => {
    const items = getCart();
    setCartItems(items);
    setCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
  };

  useEffect(() => {
    try {
      const session = localStorage.getItem('ecom_session_v1');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (e) {
      console.error('Header auth check failed:', e);
    }
    
    updateCartState();
    window.addEventListener('cart_updated', updateCartState);
    return () => window.removeEventListener('cart_updated', updateCartState);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/games?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate(`/games`);
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/,/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

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
          <form onSubmit={handleSearch} className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-irshop-accent transition-shadow relative">
            <input
              type="text"
              placeholder="Search Ir-Shop"
              className="flex-1 px-3 py-2 text-black outline-none bg-white min-w-0"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="bg-irshop-accent hover:bg-irshop-accent-hover px-4 flex items-center justify-center text-black transition-colors">
              <Search size={20} />
            </button>
          </form>

          {/* Tools */}
          <div className="flex items-center gap-1">
            {/* Account Link */}
            <a 
              href={user ? "/dashboard.html" : "/auth.html"} 
              className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex flex-col items-start transition-colors"
            >
              <span className="text-[11px] leading-tight">Account</span>
              <div className="flex items-center gap-0.5">
                <span className="font-bold text-sm">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
                <ChevronDown size={12} className="text-gray-400" />
              </div>
            </a>

            <div onClick={() => setIsCartOpen(true)} className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex items-center gap-1 transition-colors">
              <div className="relative">
                <ShoppingCart size={32} className="text-[#FFD700]" />
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
              <Menu size={20} className="text-[#FFD700]" />
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

      {/* Cart Slide-out Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] sm:w-[400px] bg-white z-[101] flex flex-col shadow-2xl"
            >
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Your Cart ({cartCount})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-800 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart size={48} className="mb-4 text-gray-300" />
                    <p className="text-sm font-medium">Your cart is empty.</p>
                    <button onClick={() => { setIsCartOpen(false); navigate('/games'); }} className="mt-4 text-blue-600 hover:underline text-sm">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-4">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                        <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">{item.title}</h3>
                        <span className="text-sm font-bold text-gray-900 mb-2">TZS {item.price}</span>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="px-3 py-1 text-xs font-medium border-x border-gray-300">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900">TZS {cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-3 rounded-md text-sm font-bold transition-colors shadow-sm">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[350px] bg-white z-[101] overflow-y-auto"
          >
            <div className="bg-irshop-teal text-white p-4 flex flex-col sticky top-0 z-10">
              <div className="flex items-center justify-end">
                <button 
                  onClick={onClose}
                  className="text-white hover:text-gray-300"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            <div className="py-2">
              <div className="px-6 py-3 font-bold text-lg border-b border-gray-200 mb-1">Trending</div>
              <ul className="text-gray-700 pb-2">
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Best Sellers</li>
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">New Releases</li>
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Movers & Shakers</li>
              </ul>

              <div className="px-6 py-3 font-bold text-lg border-b border-gray-200 my-1">Digital Content & Devices</div>
              <ul className="text-gray-700 pb-2">
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  Prime Video <ChevronRight size={18} />
                </li>
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  Amazon Music <ChevronRight size={18} />
                </li>
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  Echo & Alexa <ChevronRight size={18} />
                </li>
              </ul>

              <div className="px-6 py-3 font-bold text-lg border-b border-gray-200 my-1">Shop By Department</div>
              <ul className="text-gray-700 pb-2">
                {categories.map(cat => (
                  <li key={cat} className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                    {cat} <ChevronRight size={18} />
                  </li>
                ))}
                <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-blue-600 font-medium">See All</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileBottomNav = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      setIsLoggedIn(!!localStorage.getItem('ecom_session_v1'));
    } catch (e) {
      console.error('Mobile nav auth check failed:', e);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 z-[60] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Link to="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors">
        <Home size={22} className="text-[#FFD700]" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <a href={isLoggedIn ? "/dashboard.html" : "/auth.html"} className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors cursor-pointer">
        <User size={22} className="text-[#FFD700]" />
        <span className="text-[10px] font-medium">Account</span>
      </a>
      <div className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors cursor-pointer relative">
        <ShoppingCart size={22} className="text-[#FFD700]" />
        <span className="absolute -top-1 -right-1 bg-irshop-teal text-irshop-accent rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]">0</span>
        <span className="text-[10px] font-medium">Cart</span>
      </div>
      <button onClick={onMenuOpen} className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors">
        <Menu size={22} className="text-[#FFD700]" />
        <span className="text-[10px] font-medium">Menu</span>
      </button>
    </div>
  );
};
