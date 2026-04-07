import { Star, MoreVertical, Trash2, Edit } from "lucide-react";
import { UserProduct, useUserProducts } from "../../UserProductsContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProductGridProps {
  products: UserProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: UserProduct }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { deleteProduct } = useUserProducts();
  const [showMenu, setShowMenu] = useState(false);

  const handleProductClick = () => {
    const slug = encodeURIComponent(
      product.name.substring(0, 30).replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-").toLowerCase()
    );
    navigate(`/product/${slug}`, {
      state: {
        product: {
          title: product.name,
          img: product.image,
          rating: product.rating,
          reviews: product.reviews,
          price: product.price,
          delivery: product.delivery,
          isBestSeller: product.isBestSeller,
          isOverallPick: product.isOverallPick
        }
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
      setShowMenu(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
      {/* Badge */}
      {product.isBestSeller && (
        <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          Best Seller
        </div>
      )}
      {product.isOverallPick && (
        <div className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md">
          Top Pick
        </div>
      )}

      {/* Menu Button */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <MoreVertical size={16} className="text-gray-600" />
        </button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit size={14} />
                Edit Product
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ id: product.id, title: product.name, img: product.image, price: product.price });
                  setIsCartOpen(true);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Image */}
      <div
        onClick={handleProductClick}
        className="aspect-square bg-gray-50 flex items-center justify-center p-4 cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          onClick={handleProductClick}
          className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 cursor-pointer hover:text-orange-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-900 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xs text-gray-600">TZS</span>
          <span className="text-xl font-bold text-gray-900">
            {parseFloat(product.price).toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ id: product.id, title: product.name, img: product.image, price: product.price });
            setIsCartOpen(true);
          }}
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
