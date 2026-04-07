import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, ChevronDown, X } from "lucide-react";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { searchProducts, filterByPrice, filterByTags, sortProducts, Product } from "./utils/searchUtils";
import productsData from "./data/products.json";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "motion/react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    let results = searchProducts(productsData as Product[], query);
    
    if (selectedTags.length > 0) {
      results = filterByTags(results, selectedTags);
    }
    
    results = filterByPrice(results, priceRange[0], priceRange[1]);
    
    if (sortBy !== "relevance") {
      results = sortProducts(results, sortBy);
    }
    
    return results;
  }, [query, selectedTags, priceRange, sortBy]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    searchResults.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [searchResults]);

  const handleProductClick = (product: Product) => {
    const slug = encodeURIComponent(product.name.substring(0, 30).replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-").toLowerCase());
    navigate(`/product/${slug}`, { state: { product: { 
      title: product.name, 
      img: product.image, 
      rating: product.rating, 
      reviews: product.reviews, 
      price: product.price, 
      delivery: product.delivery,
      isBestSeller: product.isBestSeller,
      isOverallPick: product.isOverallPick
    }}});
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-[#e3e6e6]">
      <Header onMenuOpen={() => setIsMenuOpen(true)} searchTerm={query} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 pt-4 pb-20 md:pb-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-1">
            {searchResults.length} results for "{query}"
          </h1>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-4 shadow-sm space-y-6 sticky top-20">
              <div>
                <h3 className="text-sm font-bold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <button onClick={() => setPriceRange([0, 500000])} className="block text-xs hover:text-orange-600">Under TZS 500,000</button>
                  <button onClick={() => setPriceRange([500000, 2000000])} className="block text-xs hover:text-orange-600">TZS 500K - 2M</button>
                  <button onClick={() => setPriceRange([2000000, 5000000])} className="block text-xs hover:text-orange-600">TZS 2M - 5M</button>
                  <button onClick={() => setPriceRange([5000000, 10000000])} className="block text-xs hover:text-orange-600">Over TZS 5M</button>
                </div>
              </div>

              {availableTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold mb-3">Filter by Type</h3>
                  <div className="space-y-2">
                    {availableTags.slice(0, 10).map(tag => (
                      <label key={tag} className="flex items-center gap-2 text-xs cursor-pointer hover:text-orange-600">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-3 h-3"
                        />
                        <span className="capitalize">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedTags.length > 0 && (
                <button onClick={() => setSelectedTags([])} className="text-xs text-blue-600 hover:text-orange-600 font-medium">
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-medium">
                Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
                <ChevronDown size={14} className={showFilters ? "rotate-180" : ""} />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 hidden md:inline">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-xs outline-none">
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-white p-4 mb-4 rounded-md shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><X size={16} /></button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold mb-2">Price Range</h4>
                      <div className="space-y-1">
                        <button onClick={() => setPriceRange([0, 500000])} className="block text-xs hover:text-orange-600">Under TZS 500,000</button>
                        <button onClick={() => setPriceRange([500000, 2000000])} className="block text-xs hover:text-orange-600">TZS 500K - 2M</button>
                        <button onClick={() => setPriceRange([2000000, 5000000])} className="block text-xs hover:text-orange-600">TZS 2M - 5M</button>
                      </div>
                    </div>

                    {availableTags.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold mb-2">Type</h4>
                        <div className="space-y-1">
                          {availableTags.slice(0, 8).map(tag => (
                            <label key={tag} className="flex items-center gap-2 text-xs">
                              <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} className="w-3 h-3" />
                              <span className="capitalize">{tag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {searchResults.length === 0 ? (
              <div className="bg-white p-8 rounded-md shadow-sm text-center">
                <h2 className="text-lg font-bold mb-2">No products found for "{query}"</h2>
                <p className="text-sm text-gray-600 mb-4">Try different keywords or check your spelling</p>
                <button onClick={() => navigate("/games")} className="bg-irshop-accent hover:bg-irshop-accent-hover text-black px-6 py-2 rounded-full text-sm font-medium">
                  Browse All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                {searchResults.map((product) => (
                  <div key={product.id} onClick={() => handleProductClick(product)} className="bg-white p-2 sm:p-4 flex flex-col h-full shadow-sm border border-gray-100 rounded-[10px] hover:shadow-md transition-all cursor-pointer relative">
                    {product.isBestSeller && (
                      <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-[10px] z-10">
                        Best Seller
                      </div>
                    )}
                    {product.isOverallPick && (
                      <div className="absolute top-0 left-0 bg-[#232f3e] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-[10px] z-10">
                        Overall Pick
                      </div>
                    )}

                    <div className="aspect-square mb-2 sm:mb-3 overflow-hidden flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-[11px] sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 mb-1 hover:text-orange-600 leading-tight sm:leading-normal">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-orange-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className="sm:w-[14px] sm:h-[14px]" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-blue-600">{product.reviews}</span>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-baseline gap-0.5 mb-1">
                          <span className="text-[10px] sm:text-xs font-bold self-start mt-0.5 sm:mt-1">TZS</span>
                          <span className="text-base sm:text-2xl font-bold">{parseFloat(product.price).toLocaleString()}</span>
                        </div>

                        <button onClick={(e) => { e.stopPropagation(); addToCart({ id: product.id, title: product.name, img: product.image, price: product.price }); setIsCartOpen(true); }} className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors shadow-sm">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
