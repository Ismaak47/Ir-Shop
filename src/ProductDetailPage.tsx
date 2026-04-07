import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, RotateCcw, Heart, Share2, ShoppingCart, Package, CheckCircle } from "lucide-react";
import { useCart } from "./CartContext";
import { useProducts, Product } from "./ProductsContext";

const fallbackImage = "https://via.placeholder.com/400x400?text=No+Image";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { getProductById, products } = useProducts();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0);
      } else {
        setProduct(null);
      }
    }
    setIsLoading(false);
  }, [id, getProductById, products]);

  const displayImages = product?.images && product.images.length > 0
    ? product.images
    : product?.image
      ? [product.image]
      : [fallbackImage];

  const currentImage = displayImages[selectedImage] || fallbackImage;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.name,
        img: currentImage,
        price: product.price
      }, quantity);
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.name,
        img: currentImage,
        price: product.price
      }, quantity);
      navigate("/checkout");
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0" : numPrice.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col text-sm font-sans bg-[#F9FAFB]">
        <Header onMenuOpen={() => setIsMenuOpen(true)} />
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />
        
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-[#F9FAFB]">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs / Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-black mb-4 sm:mb-6 transition-colors font-bold text-[11px] sm:text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} className="mr-2" /> Back to results
        </button>

        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">

            {/* Images Section */}
            <div className="lg:col-span-2 p-5 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/30">
              {/* Main Image */}
              <div className="aspect-square w-full max-w-[350px] flex items-center justify-center bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-4 overflow-hidden">
                <img 
                  src={currentImage} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer" 
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                  {displayImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg p-1 cursor-pointer shadow-sm transition-all ${
                        selectedImage === idx
                          ? 'border-2 border-orange-500 opacity-100 ring-2 ring-orange-200'
                          : 'border border-gray-200 hover:border-gray-400 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-contain mix-blend-multiply" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="lg:col-span-2 p-5 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100">
              {/* Badges */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {product.isBestSeller && (
                  <span className="inline-block bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                    Best Seller
                  </span>
                )}
                {product.isOverallPick && (
                  <span className="inline-block bg-[#232f3e] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                    Overall Pick
                  </span>
                )}
                {product.isUserProduct && (
                  <span className="inline-block bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                    Seller's Product
                  </span>
                )}
              </div>

              <h1 className="text-[15px] sm:text-[17px] font-bold text-gray-900 leading-snug mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                  <Star size={10} className="text-orange-400" fill="currentColor" />
                  <span className="font-bold text-[11px] text-gray-900">{product.rating || 0}</span>
                </div>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">{product.reviews || "0"} Ratings</span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <h3 className="font-bold text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-bold text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[11px] font-bold text-gray-600 mt-1">TZS</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{formatPrice(product.price)}</span>
                </div>
                <p className="text-[10px] text-gray-500 tracking-wide uppercase">Suggested Retail Price. Includes taxes.</p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 mt-auto pt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 text-[11px] font-medium text-gray-700">
                  <ShieldCheck size={14} className="text-green-600" />
                  <span><strong>1 Year</strong> Extended Warranty Included</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium text-gray-700">
                  <RotateCcw size={14} className="text-blue-600" />
                  <span><strong>30 Days</strong> Free Return Policy</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium text-gray-700">
                  <CheckCircle size={14} className="text-green-600" />
                  <span><strong>Verified</strong> Product Quality</span>
                </div>
              </div>
            </div>

            {/* Buy Section */}
            <div className="lg:col-span-1 p-5 sm:p-6 bg-white flex flex-col">
              <p className="text-[11px] text-gray-600 mb-4 font-bold leading-relaxed">{product.delivery || "Standard delivery available"}</p>

              <div className="flex items-center gap-2 mb-5 text-green-600 text-[11px] uppercase tracking-wider font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div> In Stock
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Quantity</label>
                <div className="flex items-center border border-gray-200 rounded-lg w-max bg-gray-50 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                  >-</button>
                  <span className="w-8 text-center font-bold text-[12px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                  >+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#FFD700] hover:bg-[#FACC15] text-black py-2.5 rounded-xl font-extrabold text-[12px] uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(255,215,0,0.3)] hover:shadow-[0_4px_12px_rgba(255,215,0,0.4)] mb-3 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingCart size={14} /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-extrabold text-[12px] uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_12px_rgba(249,115,22,0.4)] mb-5 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Buy It Now
              </button>

              <div className="mt-auto space-y-2 border-t border-gray-100 pt-5">
                <button className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-red-500 transition-colors w-full border border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-lg py-2">
                  <Heart size={14} /> Add to Wishlist
                </button>
                <button className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-blue-500 transition-colors w-full border border-gray-200 hover:border-blue-200 hover:bg-blue-50 rounded-lg py-2">
                  <Share2 size={14} /> Share Product
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}