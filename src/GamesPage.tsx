import { Search, ShoppingCart, MapPin, Menu, Facebook, Instagram, Music2 as Tiktok, ChevronLeft, ChevronRight, ChevronDown, X, User, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Reusable Components from App.tsx (Header/Footer logic)
const Logo = () => (
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

const GameProductCard = ({ 
  title, 
  img, 
  rating, 
  reviews, 
  price, 
  delivery, 
  isBestSeller = false,
  isOverallPick = false
}: { 
  title: string, 
  img: string, 
  rating: number, 
  reviews: string, 
  price: string, 
  delivery: string,
  isBestSeller?: boolean,
  isOverallPick?: boolean,
  key?: number
}) => (
  <div className="bg-white p-4 flex flex-col h-full shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow relative">
    {isBestSeller && (
      <div className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-sm z-10">
        Best Seller
      </div>
    )}
    {isOverallPick && (
      <div className="absolute top-0 left-0 bg-[#232f3e] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-sm z-10">
        Overall Pick
      </div>
    )}
    
    <div className="aspect-square mb-3 overflow-hidden flex items-center justify-center">
      <img src={img} alt={title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
    </div>
    
    <div className="flex-1 flex flex-col">
      <h3 className="text-sm font-medium line-clamp-3 mb-1 hover:text-orange-600 cursor-pointer">{title}</h3>
      
      <div className="flex items-center gap-1 mb-1">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer">{reviews}</span>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="text-xs font-bold self-start mt-1">TZS</span>
          <span className="text-2xl font-bold">{price}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-3">{delivery}</p>
        
        <button className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

export default function GamesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const products = [
    {
      title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms Display, NVIDIA® GeForce RTX™ 5060 Laptop GPU, Intel® Core™ i7 Processor 14650HX, 16GB DDR5, 1TB Gen 4 SSD, Wi-Fi 7, Windows 11 Home",
      img: "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL320_.jpg",
      rating: 4.5,
      reviews: "389",
      price: "3,639,974",
      delivery: "TZS 244,088 delivery Fri, Apr 24",
      isOverallPick: true
    },
    {
      title: "Lenovo Legion Tower 5i – AI-Powered Gaming PC - Intel® Core Ultra 7 265F Processor – NVIDIA® GeForce RTX™ 5070 Ti Graphics – 32 GB Memory – 1 TB Storage – 3 Months of PC GamePass",
      img: "https://m.media-amazon.com/images/I/51XekLq5PxL._AC_UL320_.jpg",
      rating: 4.7,
      reviews: "72",
      price: "6,187,974",
      delivery: "TZS 680,914 delivery Fri, Apr 24"
    },
    {
      title: "13.5\" Portable Monitor 2256x1504 IPS Laptop Screen, Slim Lightweight Dual USB C HDMI Computer Gaming Display with Speakers, Travel Monitor for PC Phone PS5/4 Xbox Switch",
      img: "https://m.media-amazon.com/images/I/61Zxsgm+qWL._AC_UL320_.jpg",
      rating: 4.2,
      reviews: "New",
      price: "228,800",
      delivery: "TZS 137,670 delivery Thu, Apr 16"
    },
    {
      title: "Amazon Basics 27 inch Gaming Monitor, FHD 1080P, 165Hz, VESA Compatible, Adaptive sync, 1ms Response, Black",
      img: "https://m.media-amazon.com/images/I/81Pz0DcfP3L._AC_UL320_.jpg",
      rating: 4.5,
      reviews: "797",
      price: "374,374",
      delivery: "TZS 451,204 delivery Thu, Apr 16"
    },
    {
      title: "ASUS ROG Xbox Ally – 7” 1080p 120Hz Touchscreen Gaming Handheld, 3-month Xbox Game Pass Premium included, AMD Ryzen Z2 A, 16GB RAM, 512GB SSD, White",
      img: "https://m.media-amazon.com/images/I/61gZGeavWGL._AC_UL320_.jpg",
      rating: 4.2,
      reviews: "307",
      price: "1,299,974",
      delivery: "TZS 145,756 delivery Wed, Apr 15"
    },
    {
      title: "Alienware 16 Aurora Laptop AC16250-16-inch 16:10 WQXGA Display, Intel Core 7-240H Series 2, 16GB DDR5 RAM, 1TB SSD, NVIDIA GeForce RTX 5060 8GB GDDR7, Windows 11 Home, Onsite Service - Blue",
      img: "https://m.media-amazon.com/images/I/71LIpVe8h6L._AC_UL320_.jpg",
      rating: 4.2,
      reviews: "116",
      price: "2,846,662",
      delivery: "Contact for shipping"
    },
    {
      title: "WOLFBOX MegaFlow 50 Compressed Air Duster-110000RPM Super Power Electric Air Duster, 3-Gear Adjustable Mini Blower with Fast Charging, Dust Blower for Computer, Keyboard, House, Outdoor and Car",
      img: "https://m.media-amazon.com/images/I/713BEhBxXWL._AC_UL320_.jpg",
      rating: 4.6,
      reviews: "9,986",
      price: "103,974",
      delivery: "TZS 114,218 delivery Wed, Apr 15",
      isBestSeller: true
    },
    {
      title: "Lenovo Legion Pro 7i – AI-Powered Gaming Laptop – Intel® Core Ultra 7 255HX – 16\" WQXGA PureSight OLED Display – 240Hz – NVIDIA® GeForce RTX™ 5070 Ti – 32GB Memory – 2TB Storage – PC GamePass",
      img: "https://m.media-amazon.com/images/I/81SKqogPgCL._AC_UL320_.jpg",
      rating: 4.0,
      reviews: "44",
      price: "5,160,896",
      delivery: "TZS 243,438 delivery Fri, Apr 24"
    },
    {
      title: "Alienware Aurora Gaming Desktop ACT1250 - Intel Core Ultra 9 285 Processor, Liquid Cooled, NVIDIA GeForce RTX 5080, 32GB DDR5 RAM, 1TB SSD, 1000W Platinum Rated PSU, Windows 11 Home - Clear Panel",
      img: "https://m.media-amazon.com/images/I/71MvbQRvOuL._AC_UL320_.jpg",
      rating: 4.0,
      reviews: "103",
      price: "6,887,400",
      delivery: "Contact for shipping"
    },
    {
      title: "ASUS TUF Gaming F16 (2025) Gaming Laptop, 16” FHD+ 165Hz 16:10 Display, Intel® Core™ i5 Processor 13450HX, NVIDIA® GeForce RTX™ 5050, 16GB DDR5, 512GB PCIe Gen4 SSD, Wi-Fi 6E, Win 11 Home",
      img: "https://m.media-amazon.com/images/I/71cjDQIKaPL._AC_UL320_.jpg",
      rating: 4.0,
      reviews: "25",
      price: "2,859,974",
      delivery: "TZS 225,030 delivery Wed, Apr 15"
    },
    {
      title: "ASUS TUF Gaming Series 5 24.5” 1080P Monitor (VG259QM5A) – Full HD, Fast-IPS, 240Hz, 0.3ms, G-SYNC Compatible, FreeSync Premium, 99% sRGB, DisplayWidget, Gaming AI, 3 yr Warranty",
      img: "https://m.media-amazon.com/images/I/71aaIpb0BuL._AC_UL320_.jpg",
      rating: 4.5,
      reviews: "19",
      price: "387,400",
      delivery: "TZS 351,260 delivery Apr 27 - May 28"
    },
    {
      title: "SAMSUNG 32\" Odyssey G55C Series QHD 1000R Curved Gaming Monitor, 1ms(MPRT), HDR10, 165Hz, AMD Radeon FreeSync, Eye Care, Glare Free, Sharp Resolution LS32CG550ENXZA",
      img: "https://m.media-amazon.com/images/I/81cYQ1dO5xL._AC_UL320_.jpg",
      rating: 4.4,
      reviews: "1,607",
      price: "519,974",
      delivery: "TZS 532,792 delivery Wed, Apr 15"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-white">
      {/* Header */}
      <header className="bg-irshop-teal text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1500px] mx-auto flex items-center gap-4 p-2">
          <Link to="/" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
            <Logo />
          </Link>

          <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-irshop-accent transition-shadow relative">
            <input
              type="text"
              placeholder="Search Ir-Shop"
              className="flex-1 px-3 py-2 text-black outline-none bg-white min-w-0"
              defaultValue="gaming"
            />
            <button className="bg-irshop-accent hover:bg-irshop-accent-hover px-4 flex items-center justify-center text-black transition-colors">
              <Search size={20} />
            </button>
          </div>

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

        <div className="bg-irshop-teal-light relative">
          <div className="max-w-[1500px] mx-auto flex items-center px-2 py-1 gap-4 overflow-x-auto no-scrollbar">
            <div 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer font-bold whitespace-nowrap transition-colors"
            >
              <Menu size={20} />
              All
            </div>
            <ul className="flex items-center gap-4 text-sm font-medium whitespace-nowrap">
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors font-bold">Today's Deals</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Gift Cards</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Sell</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Registry</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Prime Video</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Customer Service</li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h1 className="text-lg font-bold">
              1-48 of over 100,000 results for <span className="text-irshop-teal">"gaming"</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Sort by:</span>
              <select className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-irshop-teal">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Avg. Customer Review</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product, index) => (
              <GameProductCard 
                key={index} 
                title={product.title}
                img={product.img}
                rating={product.rating}
                reviews={product.reviews}
                price={product.price}
                delivery={product.delivery}
                isBestSeller={product.isBestSeller}
                isOverallPick={product.isOverallPick}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="irshop-footer mt-10">
        <div className="irshop-footer-container">
          <div className="irshop-footer-grid">
            <div className="irshop-footer-col">
              <h4>Get to Know Us</h4>
              <ul>
                <li><a href="#">About Ir-Shop</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Investor Relations</a></li>
                <li><a href="#">Ir-Shop Devices</a></li>
                <li><a href="#">Ir-Shop Science</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Make Money with Us</h4>
              <ul>
                <li><a href="#">Sell products on Ir-Shop</a></li>
                <li><a href="#">Sell on Ir-Shop Business</a></li>
                <li><a href="#">Sell apps on Ir-Shop</a></li>
                <li><a href="#">Become an Affiliate</a></li>
                <li><a href="#">Advertise Your Products</a></li>
                <li><a href="#">Self-Publish with Us</a></li>
                <li><a href="#">Host an Ir-Shop Hub</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Ir-Shop Payment Products</h4>
              <ul>
                <li><a href="#">Ir-Shop Business Card</a></li>
                <li><a href="#">Shop with Points</a></li>
                <li><a href="#">Reload Your Balance</a></li>
                <li><a href="#">Ir-Shop Currency Converter</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Let Us Help You</h4>
              <ul>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Your Orders</a></li>
                <li><a href="#">Shipping Rates & Policies</a></li>
                <li><a href="#">Returns & Replacements</a></li>
                <li><a href="#">Manage Your Content</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>

          <div className="irshop-footer-middle">
            <div className="irshop-footer-middle-content">
              <div className="irshop-footer-social">
                <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="#" aria-label="TikTok"><Tiktok size={18} /></a>
              </div>
              <div className="irshop-footer-payment">
                <div className="irshop-footer-payment-icons flex gap-2">
                  <div className="w-10 h-6 bg-[#1A1F71] rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center overflow-hidden">
                    <div className="w-4 h-4 bg-red-600 rounded-full -mr-1"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded-full opacity-80"></div>
                  </div>
                  <div className="w-10 h-6 bg-[#003087] rounded flex items-center justify-center text-[7px] font-bold text-white italic">PayPal</div>
                </div>
              </div>
            </div>
          </div>

          <div className="irshop-footer-bottom">
            <div className="irshop-footer-bottom-right">
              <span>© 2026 Ir-Shop. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
