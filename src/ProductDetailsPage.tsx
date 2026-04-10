import { Star, MapPin, ShieldCheck, Truck, RotateCcw, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import SafeImage from "./components/SafeImage";
import { getProducts, addToCart, Product } from "./lib/store";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const products = getProducts();
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#e3e6e6]">
        <Header onMenuOpen={() => setIsMenuOpen(true)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Product not found</h2>
            <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/games?q=${product.category}`} className="hover:underline">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-md">{product.title}</span>
        </div>
      </div>

      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Left: Image Gallery */}
          <div className="w-full md:w-2/5 lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-square w-full border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4 bg-white sticky top-4">
              <SafeImage 
                src={product.img} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500 cursor-zoom-in" 
              />
            </div>
          </div>

          {/* Middle: Product Info */}
          <div className="w-full md:w-3/5 lg:w-1/3 flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl font-medium leading-tight mb-2 text-gray-900">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-2">
              <Link to={`/games?q=${product.brand}`} className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
                Visit the {product.brand} Store
              </Link>
              <div className="flex items-center gap-1">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer">{product.reviews} ratings</span>
              </div>
            </div>

            {product.isBestSeller && (
              <div className="mb-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                  Best Seller
                </span>
              </div>
            )}

            <hr className="my-4 border-gray-200" />

            <div className="mb-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-sm font-medium self-start mt-1">TZS</span>
                <span className="text-3xl font-medium">{product.price}</span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex gap-4">
                <span className="font-bold w-24">Brand</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold w-24">Condition</span>
                <span>{product.condition}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold w-24">Category</span>
                <span>{product.category}</span>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="space-y-2">
              <h3 className="font-bold text-base">About this item</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                <li>High-quality {product.category.toLowerCase()} from {product.brand}.</li>
                <li>Condition: {product.condition}.</li>
                <li>Perfect for your everyday needs with reliable performance.</li>
                <li>Includes standard manufacturer warranty.</li>
                <li>{product.hasDiscount ? "Currently available at a discounted price." : "Great value for the price."}</li>
              </ul>
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="w-full lg:w-1/4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm sticky top-4">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-sm font-medium self-start mt-1">TZS</span>
                <span className="text-2xl font-medium">{product.price}</span>
              </div>

              <div className="mb-4 text-sm">
                <p className="text-gray-600 mb-2">{product.delivery}</p>
                <div className="flex items-start gap-2 text-gray-800">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-blue-600 hover:text-orange-600 cursor-pointer">Deliver to Tanzania, United Republic of</span>
                </div>
              </div>

              <h4 className="text-green-700 text-lg font-medium mb-4">In Stock</h4>

              <div className="mb-4">
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <select 
                  id="quantity" 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>Quantity: {num}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 mb-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                  Buy Now
                </button>
              </div>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-gray-400" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-gray-400" />
                  <span>Ships from Ir-Shop</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-gray-400" />
                  <span>Return policy: Eligible for Return, Refund or Replacement</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
