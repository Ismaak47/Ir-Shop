import { Star, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./ProductsContext";

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
  title: string;
  img: string;
  rating: number;
  reviews: string;
  price: string;
  delivery: string;
  isBestSeller?: boolean;
  isOverallPick?: boolean;
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleProductClick = () => {
    const shortSlug = encodeURIComponent(title.substring(0, 30).replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-").toLowerCase());
    navigate(`/product/${shortSlug}`, {
      state: {
        product: { title, img, rating, reviews, price, delivery, isBestSeller, isOverallPick }
      }
    });
  };

  return (
    <div
      className="bg-white p-2 sm:p-4 flex flex-col h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 rounded-[10px] hover:shadow-md transition-all relative cursor-pointer"
      onClick={handleProductClick}
    >
      {isBestSeller && (
        <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-[10px] z-10">
          Best Seller
        </div>
      )}
      {isOverallPick && (
        <div className="absolute top-0 left-0 bg-[#232f3e] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-[10px] z-10">
          Overall Pick
        </div>
      )}

      <div className="aspect-square mb-2 sm:mb-3 overflow-hidden flex items-center justify-center">
        <img src={img} alt={title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[11px] sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 mb-1 hover:text-orange-600 leading-tight sm:leading-normal">
          {title}
        </h3>

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
            <span className="text-base sm:text-2xl font-bold">{parseFloat(price).toLocaleString()}</span>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1">{delivery}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id: title, title, img, price });
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
  const itemsPerPage = 12;
  const { products } = useProducts();

  const gamingProducts = products.filter(p => 
    p.category === "games" || 
    p.tags.some(tag => ["gaming", "laptop", "desktop", "monitor", "keyboard", "mouse"].includes(tag.toLowerCase()))
  );

  const totalPages = Math.ceil(gamingProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = gamingProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 pt-4 pb-20 md:pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
          {currentProducts.map((product) => (
            <GameProductCard
              key={product.id}
              title={product.name}
              img={product.image}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
              delivery={product.delivery}
              isBestSeller={product.isBestSeller}
              isOverallPick={product.isOverallPick}
            />
          ))}
        </div>

        {totalPages > 1 && (
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
      </main>

      <Footer />
    </div>
  );
}
