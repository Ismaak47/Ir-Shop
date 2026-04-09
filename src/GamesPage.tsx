import { Star, Menu, X, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import SafeImage from "./components/SafeImage";
import { motion, AnimatePresence } from "motion/react";
import { getProducts, addToCart, Product } from "./lib/store";

interface GameProductCardProps {
  product: Product;
}

const GameProductCard: React.FC<GameProductCardProps> = ({ product }) => (
  <div className="bg-white p-2 sm:p-4 flex flex-col h-full shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow relative">
    {product.isBestSeller && (
      <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-sm z-10">
        Best Seller
      </div>
    )}
    {product.isOverallPick && (
      <div className="absolute top-0 left-0 bg-[#232f3e] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-sm z-10">
        Overall Pick
      </div>
    )}
    
    <div className="aspect-square mb-2 sm:mb-3 overflow-hidden flex items-center justify-center">
      <SafeImage src={product.img} alt={product.title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    
    <div className="flex-1 flex flex-col">
      <h3 className="text-[11px] sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 mb-1 hover:text-orange-600 cursor-pointer leading-tight sm:leading-normal">{product.title}</h3>
      
      <div className="flex items-center gap-1 mb-1">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="sm:w-[14px] sm:h-[14px]" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-[10px] sm:text-xs text-blue-600 hover:text-orange-600 cursor-pointer">{product.reviews}</span>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="text-[10px] sm:text-xs font-bold self-start mt-0.5 sm:mt-1">TZS</span>
          <span className="text-base sm:text-2xl font-bold">{product.price}</span>
        </div>
        
        <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1">{product.delivery}</p>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors shadow-sm"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

export default function GamesPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
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
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 12;
  
  useEffect(() => {
    setProducts(getProducts());
  }, []);
  
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
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (filters.condition && p.condition !== filters.condition) return false;
    if (filters.onlyDeals && !p.hasDiscount) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
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
      <Header onMenuOpen={() => setIsMenuOpen(true)} searchTerm={searchQuery || "gaming"} />
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
                  key={product.id || indexOfFirstProduct + index} 
                  product={product}
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
