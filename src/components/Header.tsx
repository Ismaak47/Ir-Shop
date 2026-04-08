import { Search, ShoppingCart, Menu, User, ChevronDown, X, ChevronRight, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  return (
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
          <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex items-center gap-1 transition-colors">
            <div className="relative">
              <ShoppingCart size={32} />
              <span className="absolute -top-1 -right-1 bg-irshop-teal text-irshop-accent rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs border-2 border-irshop-teal">0</span>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User size={20} className="text-irshop-teal" />
                  </div>
                  <span className="font-bold text-lg text-[#FFD700]">
                    Hello, Sign In
                  </span>
                </div>
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
      <div className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors cursor-pointer relative">
        <ShoppingCart size={22} />
        <span className="absolute -top-1 -right-1 bg-irshop-teal text-irshop-accent rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]">0</span>
        <span className="text-[10px] font-medium">Cart</span>
      </div>
      <button onClick={onMenuOpen} className="flex flex-col items-center gap-1 text-gray-600 hover:text-irshop-teal transition-colors">
        <Menu size={22} />
        <span className="text-[10px] font-medium">Menu</span>
      </button>
    </div>
  );
};
