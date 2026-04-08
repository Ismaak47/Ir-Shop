import { Star, Menu, X, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";

interface GameProductCardProps {
  title: string;
  img: string;
  rating: number;
  reviews: string;
  price: string;
  delivery: string;
  isBestSeller?: boolean;
  isOverallPick?: boolean;
}

const GameProductCard: React.FC<GameProductCardProps> = ({ 
  title, 
  img, 
  rating, 
  reviews, 
  price, 
  delivery, 
  isBestSeller = false,
  isOverallPick = false
}) => (
  <div className="bg-white p-2 sm:p-4 flex flex-col h-full shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow relative">
    {isBestSeller && (
      <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-sm z-10">
        Best Seller
      </div>
    )}
    {isOverallPick && (
      <div className="absolute top-0 left-0 bg-[#232f3e] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-sm z-10">
        Overall Pick
      </div>
    )}
    
    <div className="aspect-square mb-2 sm:mb-3 overflow-hidden flex items-center justify-center">
      <img src={img} alt={title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" loading="lazy" />
    </div>
    
    <div className="flex-1 flex flex-col">
      <h3 className="text-[11px] sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 mb-1 hover:text-orange-600 cursor-pointer leading-tight sm:leading-normal">{title}</h3>
      
      <div className="flex items-center gap-1 mb-1">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="sm:w-[14px] sm:h-[14px]" fill={i < Math.floor(rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-[10px] sm:text-xs text-blue-600 hover:text-orange-600 cursor-pointer">{reviews}</span>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="text-[10px] sm:text-xs font-bold self-start mt-0.5 sm:mt-1">TZS</span>
          <span className="text-base sm:text-2xl font-bold">{price}</span>
        </div>
        
        <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1">{delivery}</p>
        
        <button className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors shadow-sm">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

interface Product {
  title: string;
  img: string;
  rating: number;
  reviews: string;
  price: string;
  delivery: string;
  isBestSeller?: boolean;
  isOverallPick?: boolean;
  category: string;
  brand: string;
  condition: string;
  hasDiscount: boolean;
}

export default function GamesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const [filters, setFilters] = useState({
    category: "",
    brands: [] as string[],
    condition: "",
    onlyDeals: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const products: Product[] = [
    {
      title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms Display, NVIDIA® GeForce RTX™ 5060 Laptop GPU, Intel® Core™ i7 Processor 14650HX, 16GB DDR5, 1TB Gen 4 SSD, Wi-Fi 7, Windows 11 Home",
      img: "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL400_.jpg",
      rating: 4.5,
      reviews: "389",
      price: "3,639,974",
      delivery: "TZS 244,088 delivery Fri, Apr 24",
      isOverallPick: true,
      category: "Laptop",
      brand: "ASUS",
      condition: "New",
      hasDiscount: true
    },
    {
      title: "Razer Iskur X - Ergonomic Gaming Chair for All-Day Gaming Comfort - Multi-Layered Synthetic Leather - High Density Foam Cushions - 2D Armrests - Steel-Reinforced Body - Black/Green",
      img: "https://m.media-amazon.com/images/I/719MpRszpCL._AC_UL300_.jpg",
      rating: 4.6,
      reviews: "1,245",
      price: "899,000",
      delivery: "TZS 150,000 delivery Wed, Apr 15",
      category: "Chair",
      brand: "Razer",
      condition: "New",
      hasDiscount: false
    },
    {
      title: "Logitech G Pro X Wireless Lightspeed Gaming Headset - Blue VO!CE Mic Filter Tech, 50mm PRO-G Drivers, DTS Headphone:X 2.0 Surround Sound - Black",
      img: "https://m.media-amazon.com/images/I/81L7Ck1WgKL._AC_UL300_.jpg",
      rating: 4.7,
      reviews: "5,678",
      price: "450,000",
      delivery: "TZS 50,000 delivery Wed, Apr 15",
      category: "Headset",
      brand: "Logitech",
      condition: "New",
      hasDiscount: true
    },
    {
      title: "SteelSeries Apex Pro TKL Wireless (2025) Mechanical Gaming Keyboard – World's Fastest Keyboard – Adjustable Actuation – OLED Smart Display – RGB – PBT Keycaps – Bluetooth 5.0 – 2.4GHz",
      img: "https://m.media-amazon.com/images/I/71pmVGTqEfL._AC_UL300_.jpg",
      rating: 4.8,
      reviews: "2,341",
      price: "650,000",
      delivery: "TZS 45,000 delivery Wed, Apr 15",
      category: "Keyboard & Mouse",
      brand: "SteelSeries",
      condition: "New",
      hasDiscount: true
    },
    {
      title: "Corsair K70 RGB PRO Wired Mechanical Gaming Keyboard - Cherry MX Speed Switches - PBT Double-Shot Keycaps - 8,000Hz Hyper-Polling - iCUE Compatible - Black",
      img: "https://m.media-amazon.com/images/I/71pmVGTqEfL._AC_UL300_.jpg",
      rating: 4.6,
      reviews: "3,456",
      price: "380,000",
      delivery: "TZS 40,000 delivery Wed, Apr 15",
      category: "Keyboard & Mouse",
      brand: "Corsair",
      condition: "Renewed",
      hasDiscount: false
    },
    {
      title: "msi Katana 15 HX 15.6” 165Hz QHD+ Gaming Laptop: Intel Core i9-14900HX, NVIDIA Geforce RTX 5070, 32GB DDR5, 1TB NVMe SSD, RGB Keyboard, Win 11 Home: Black B14WGK-016US",
      img: "https://m.media-amazon.com/images/I/71TvKdAmIjL._AC_UL300_.jpg",
      rating: 4.2,
      reviews: "267",
      price: "4,367,974",
      delivery: "TZS 227,240 delivery Fri, Apr 24",
      category: "Laptop",
      brand: "msi",
      condition: "New",
      hasDiscount: true
    },
    {
      title: "acer Nitro V Gaming Laptop | Intel Core i5-13420H Processor | NVIDIA GeForce RTX 4050 Laptop GPU | 15.6\" FHD IPS 165Hz Display | 8GB DDR5 | 512GB Gen 4 SSD | Wi-Fi 6 | Backlit KB | ANV15-52-586Z",
      img: "https://m.media-amazon.com/images/I/71gXelI8upL._AC_UL300_.jpg",
      rating: 4.5,
      reviews: "270",
      price: "1,949,974",
      delivery: "TZS 208,416 delivery Wed, Apr 15",
      category: "Laptop",
      brand: "acer",
      condition: "Used",
      hasDiscount: false
    },
    {
      title: "Logitech Z623 400 Watt Home Speaker System, 2.1 Speaker System - Black",
      img: "https://m.media-amazon.com/images/I/51iuieCuxSL._AC_UL300_.jpg",
      rating: 4.7,
      reviews: "12,345",
      price: "350,000",
      delivery: "TZS 35,000 delivery Wed, Apr 15",
      category: "PC Speakers",
      brand: "Logitech",
      condition: "New",
      hasDiscount: true
    },
    {
      title: "Razer BlackShark V2 Pro Wireless Gaming Headset: THX Spatial Audio 7.1 Surround Sound - 50mm Drivers - Detachable Mic - for PC, PS5, PS4, Switch, Black",
      img: "https://m.media-amazon.com/images/I/619bBByro4L._AC_UL300_.jpg",
      rating: 4.5,
      reviews: "8,901",
      price: "320,000",
      delivery: "TZS 30,000 delivery Wed, Apr 15",
      category: "Headset",
      brand: "Razer",
      condition: "New",
      hasDiscount: false
    },
    {
      title: "ASUS ROG Swift 27\" OLED Gaming Monitor (PG27AQWP-W) - TrueBlack Glossy Tandem OLED, Dual-Mode (QHD@540Hz, HD@720Hz), 0.02ms, G-SYNC Compatible, Neo Proximity Sensor, DP 2.1, 3 yr Warranty",
      img: "https://m.media-amazon.com/images/I/815FPhAVEpL._AC_UL400_.jpg",
      rating: 4.0,
      reviews: "6",
      price: "2,857,400",
      delivery: "TZS 619,424 delivery Apr 16 - May 4",
      category: "Monitor",
      brand: "ASUS",
      condition: "New",
      hasDiscount: true
    },
    {
      title: "SteelSeries Rival 600 Gaming Mouse - 12,000 CPI TrueMove3+ Dual Optical Sensor - 0.5 Lift-off Distance - Weight System - RGB Lighting",
      img: "https://m.media-amazon.com/images/I/51NuotNEd6L._AC_UL300_.jpg",
      rating: 4.4,
      reviews: "4,567",
      price: "180,000",
      delivery: "TZS 25,000 delivery Wed, Apr 15",
      category: "Keyboard & Mouse",
      brand: "SteelSeries",
      condition: "Renewed",
      hasDiscount: true
    },
    {
      title: "Corsair HS80 RGB WIRELESS Premium Gaming Headset with Spatial Audio - Carbon",
      img: "https://m.media-amazon.com/images/I/81L7Ck1WgKL._AC_UL300_.jpg",
      rating: 4.3,
      reviews: "1,234",
      price: "280,000",
      delivery: "TZS 30,000 delivery Wed, Apr 15",
      category: "Headset",
      brand: "Corsair",
      condition: "New",
      hasDiscount: false
    }
  ];
  
  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (filters.condition && p.condition !== filters.condition) return false;
    if (filters.onlyDeals && !p.hasDiscount) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-[#e3e6e6]">
      <Header onMenuOpen={() => setIsMenuOpen(true)} searchTerm="gaming" />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 pt-4 pb-0 flex gap-6">
        {/* Left Sidebar Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold mb-2">Popular Shopping Ideas</h3>
              <ul className="space-y-1 text-xs">
                {["Chair", "Headset", "Keyboard & Mouse", "PC Speakers"].map(cat => (
                  <li 
                    key={cat}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: prev.category === cat ? "" : cat }));
                      setCurrentPage(1);
                    }}
                    className={`hover:text-orange-600 cursor-pointer ${filters.category === cat ? 'text-orange-600 font-bold' : ''}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Deals & Discounts</h3>
              <ul className="space-y-1 text-xs">
                <li 
                  onClick={() => {
                    setFilters(prev => ({ ...prev, onlyDeals: !prev.onlyDeals }));
                    setCurrentPage(1);
                  }}
                  className={`hover:text-orange-600 cursor-pointer ${filters.onlyDeals ? 'text-orange-600 font-bold' : ''}`}
                >
                  All Discounts
                </li>
                <li 
                  onClick={() => {
                    setFilters(prev => ({ ...prev, onlyDeals: !prev.onlyDeals }));
                    setCurrentPage(1);
                  }}
                  className={`hover:text-orange-600 cursor-pointer ${filters.onlyDeals ? 'text-orange-600 font-bold' : ''}`}
                >
                  Today's Deals
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Customer Reviews</h3>
              <div className="flex items-center gap-1 text-xs hover:text-orange-600 cursor-pointer">
                <div className="flex text-orange-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                </div>
                <span>& Up</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Brands</h3>
              <ul className="space-y-1 text-xs">
                {["Razer", "ASUS", "Logitech", "msi", "SteelSeries", "Corsair", "acer"].map(brand => (
                  <li key={brand} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="w-3 h-3" 
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    /> 
                    {brand}
                  </li>
                ))}
              </ul>
              <span className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer mt-1 inline-block">See more</span>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Condition</h3>
              <ul className="space-y-1 text-xs">
                {["New", "Renewed", "Used"].map(cond => (
                  <li 
                    key={cond}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, condition: prev.condition === cond ? "" : cond }));
                      setCurrentPage(1);
                    }}
                    className={`hover:text-orange-600 cursor-pointer ${filters.condition === cond ? 'text-orange-600 font-bold' : ''}`}
                  >
                    {cond}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid and Results */}
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 relative">
              {/* Mobile Filters Button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors"
                >
                  <Menu size={14} />
                  <span>Filters</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMobileFiltersOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60]"
                      />
                      <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-200 rounded-md mt-1 z-[70] p-4 max-h-[80vh] overflow-y-auto"
                      >
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                          <span className="font-bold text-sm">Filters</span>
                          <button onClick={() => setIsMobileFiltersOpen(false)}>
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-bold mb-2">Popular Shopping Ideas</h3>
                            <ul className="space-y-2 text-xs">
                              {["Chair", "Headset", "Keyboard & Mouse", "PC Speakers"].map(cat => (
                                <li 
                                  key={cat}
                                  onClick={() => {
                                    setFilters(prev => ({ ...prev, category: prev.category === cat ? "" : cat }));
                                    setCurrentPage(1);
                                  }}
                                  className={`hover:text-orange-600 cursor-pointer ${filters.category === cat ? 'text-orange-600 font-bold' : ''}`}
                                >
                                  {cat}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Deals & Discounts</h3>
                            <ul className="space-y-2 text-xs">
                              <li 
                                onClick={() => {
                                  setFilters(prev => ({ ...prev, onlyDeals: !prev.onlyDeals }));
                                  setCurrentPage(1);
                                }}
                                className={`hover:text-orange-600 cursor-pointer ${filters.onlyDeals ? 'text-orange-600 font-bold' : ''}`}
                              >
                                All Discounts
                              </li>
                              <li 
                                onClick={() => {
                                  setFilters(prev => ({ ...prev, onlyDeals: !prev.onlyDeals }));
                                  setCurrentPage(1);
                                }}
                                className={`hover:text-orange-600 cursor-pointer ${filters.onlyDeals ? 'text-orange-600 font-bold' : ''}`}
                              >
                                Today's Deals
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Customer Reviews</h3>
                            <div className="flex items-center gap-1 text-xs hover:text-orange-600 cursor-pointer">
                              <div className="flex text-orange-400">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} />
                              </div>
                              <span>& Up</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Brands</h3>
                            <ul className="space-y-2 text-xs">
                              {["Razer", "ASUS", "Logitech", "msi", "SteelSeries", "Corsair", "acer"].map(brand => (
                                <li key={brand} className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    className="w-3 h-3" 
                                    checked={filters.brands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                  /> 
                                  {brand}
                                </li>
                              ))}
                            </ul>
                            <span className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer mt-1 inline-block">See more</span>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Condition</h3>
                            <ul className="space-y-2 text-xs">
                              {["New", "Renewed", "Used"].map(cond => (
                                <li 
                                  key={cond}
                                  onClick={() => {
                                    setFilters(prev => ({ ...prev, condition: prev.condition === cond ? "" : cond }));
                                    setCurrentPage(1);
                                  }}
                                  className={`hover:text-orange-600 cursor-pointer ${filters.condition === cond ? 'text-orange-600 font-bold' : ''}`}
                                >
                                  {cond}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 relative">
                <span className="text-xs text-gray-600">Sort by:</span>
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors min-w-[120px] justify-between"
                  >
                    <span>{sortBy}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsSortOpen(false)}
                          className="fixed inset-0 z-[60]"
                        />
                        <motion.div 
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="absolute top-full right-0 w-48 bg-white shadow-xl border border-gray-200 rounded-md mt-1 z-[70] overflow-hidden"
                        >
                          <ul className="py-1">
                            {["Featured", "Price: Low to High", "Price: High to Low", "Avg. Customer Review", "Newest Arrivals"].map((option) => (
                              <li 
                                key={option}
                                onClick={() => {
                                  setSortBy(option);
                                  setIsSortOpen(false);
                                }}
                                className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 transition-colors ${sortBy === option ? 'bg-gray-50 font-bold text-irshop-teal' : 'text-gray-700'}`}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
              {currentProducts.map((product, index) => (
                <GameProductCard 
                  key={indexOfFirstProduct + index} 
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

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 my-4">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Simple logic to show 1, 2, 3 ... total
                if (pageNum <= 3 || pageNum === totalPages) {
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border border-gray-300 rounded-md text-xs ${currentPage === pageNum ? 'bg-gray-100 font-bold' : 'hover:bg-gray-100'}`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === 4) {
                  return <span key="ellipsis" className="text-xs">...</span>;
                }
                return null;
              })}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
