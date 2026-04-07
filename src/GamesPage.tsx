import { Star, Menu, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useProducts, Product } from "./ProductsContext";

const GameProductCard = ({ product }: { product: Product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image;

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, {
      state: { productId: product.id }
    });
  };

  return (
    <div
      className="bg-white p-2 sm:p-4 flex flex-col h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 rounded-[10px] hover:shadow-md transition-all relative cursor-pointer"
      onClick={handleProductClick}
    >
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
        <img src={displayImage} alt={product.name} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
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
          <span className="text-[10px] sm:text-xs text-blue-600 hover:text-orange-600 cursor-pointer">{product.reviews}</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-0.5 mb-1">
            <span className="text-[10px] sm:text-xs font-bold self-start mt-0.5 sm:mt-1">TZS</span>
            <span className="text-base sm:text-2xl font-bold">{parseFloat(product.price).toLocaleString()}</span>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1">{product.delivery}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id: product.id, title: product.name, img: displayImage, price: product.price });
              setIsCartOpen(true);
            }}
            className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors shadow-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function GamesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const itemsPerPage = 12;
  const { products } = useProducts();

  const gamingProducts = products.filter(p => 
    p.category === "games" || 
    p.tags.some(tag => ["gaming", "laptop", "desktop", "monitor", "keyboard", "mouse"].includes(tag.toLowerCase()))
  );

  const sortedProducts = [...gamingProducts].sort((a, b) => {
    if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

      <main className="flex-1 max-w-[1500px] mx-auto w-full px-3 pt-3 pb-10 md:pb-4">
        {/* Mobile Topbar: Filter & Sort */}
        <div className="flex items-center justify-between gap-2 lg:hidden mb-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-xs font-medium bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal size={14} />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-xs font-medium bg-white hover:bg-gray-50"
          >
            <span>Sort By</span>
            <ChevronDown size={14} className={showSortMenu ? "rotate-180" : ""} />
          </button>
        </div>

        {/* Sort Menu Dropdown */}
        {showSortMenu && (
          <div className="lg:hidden bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden">
            {[
              { value: "relevance", label: "Relevance" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
              { value: "rating", label: "Customer Rating" },
              { value: "name", label: "Name: A-Z" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 ${
                  sortBy === option.value ? "bg-orange-50 text-orange-600 font-medium" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="font-semibold text-sm mb-3">Category</h3>
                    <div className="space-y-2">
                      {["Laptop", "Desktop", "Monitor", "Accessories", "Gaming", "Keyboard", "Mouse", "Headset"].map(cat => (
                        <label key={cat} className="flex items-center gap-2 text-xs">
                          <input type="checkbox" className="w-3 h-3" />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                    <div className="space-y-2 text-xs">
                      <button className="block text-left w-full hover:text-orange-600">Under TZS 500,000</button>
                      <button className="block text-left w-full hover:text-orange-600">TZS 500K - 2M</button>
                      <button className="block text-left w-full hover:text-orange-600">TZS 2M - 5M</button>
                      <button className="block text-left w-full hover:text-orange-600">Over TZS 5M</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Layout: Sidebar + Products */}
        <div className="hidden lg:flex gap-6">
          {/* LEFT: Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-sm mb-3">Category</h3>
                  <div className="space-y-2">
                    {["Laptop", "Desktop", "Monitor", "Accessories", "Gaming", "Keyboard", "Mouse", "Headset"].map(cat => (
                      <label key={cat} className="flex items-center gap-2 text-xs cursor-pointer hover:text-orange-600">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                  <div className="space-y-2 text-xs">
                    <button className="block text-left w-full hover:text-orange-600 py-1">Under TZS 500,000</button>
                    <button className="block text-left w-full hover:text-orange-600 py-1">TZS 500K - 2M</button>
                    <button className="block text-left w-full hover:text-orange-600 py-1">TZS 2M - 5M</button>
                    <button className="block text-left w-full hover:text-orange-600 py-1">Over TZS 5M</button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-sm mb-3">Brand</h3>
                  <div className="space-y-2">
                    {["ASUS", "Lenovo", "Alienware", "Samsung", "Acer", "HP"].map(brand => (
                      <label key={brand} className="flex items-center gap-2 text-xs cursor-pointer hover:text-orange-600">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Products Area */}
          <div className="flex-1">
            {/* Topbar with Sort */}
            <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold">{sortedProducts.length} Gaming Products</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium outline-none hover:border-gray-400"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <GameProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
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
            )}
          </div>
        </div>

        {/* Mobile Grid (below mobile topbar) */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mt-3">
          {currentProducts.map((product) => (
            <GameProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="lg:hidden flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (pageNum <= 3 || pageNum === totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border rounded text-xs ${
                      currentPage === pageNum ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === 4) return <span key="ellipsis" className="text-xs">...</span>;
              return null;
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
