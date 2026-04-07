import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useProducts, Product } from "../ProductsContext";
import { useSearch } from "../SearchContext";

interface SearchBarProps {
  defaultValue?: string;
}

export const SearchBar = ({ defaultValue = "" }: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addRecentSearch } = useSearch();
  const { searchProducts } = useProducts();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    debounceTimer.current = setTimeout(() => {
      const results = searchProducts(query);
      setSuggestions(results.slice(0, 8));
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query.trim());
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setShowSuggestions(false);
    navigate(`/product/${product.id}`, { state: { productId: product.id } });
  };

  const getDisplayImage = (product: Product) => {
    return product.images && product.images.length > 0 ? product.images[0] : product.image;
  };

  return (
    <div ref={searchRef} className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-irshop-accent transition-shadow relative">
      <form onSubmit={handleSearch} className="flex flex-1">
        <input
          type="text"
          placeholder="Search Ir-Shop"
          className="flex-1 px-3 py-2 text-black outline-none bg-white min-w-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
        />
        <button type="submit" className="bg-irshop-accent hover:bg-irshop-accent-hover px-4 flex items-center justify-center text-black transition-colors">
          <Search size={20} />
        </button>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border border-gray-200 rounded-b-md mt-1 z-[200] max-h-[500px] overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
            ) : (
              suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  className="flex gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded flex items-center justify-center">
                    <img src={getDisplayImage(product)} alt={product.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">TZS {parseFloat(product.price).toLocaleString()}</span>
                      {product.isBestSeller && (
                        <span className="text-[8px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-bold">Best Seller</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
