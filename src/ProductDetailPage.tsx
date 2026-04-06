import { Header, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, RotateCcw, Heart, Share2, ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function ProductDetailPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart, setIsCartOpen } = useCart();

    const product = location.state?.product || {
        title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms Display, NVIDIA® GeForce RTX™ 5060 Laptop GPU, Intel® Core™ i7 Processor 14650HX, 16GB DDR5, 1TB Gen 4 SSD, Wi-Fi 7, Windows 11 Home",
        img: "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL600_.jpg",
        rating: 4.5,
        reviews: "389",
        price: "3,639,974",
        delivery: "TZS 244,088 delivery Fri, Apr 24",
        isOverallPick: true
    };

    const [mainImage, setMainImage] = useState(product.img);

    useEffect(() => {
        window.scrollTo(0, 0);
        setMainImage(product.img);
    }, [location, product.img]);

    // Mock gallery images (We use distinct URLs here so the user can see them change when clicked)
    const galleryImages = [
        product.img,
        "https://m.media-amazon.com/images/I/71cjDQIKaPL._AC_UL600_.jpg",
        "https://m.media-amazon.com/images/I/81mRCWvzUTL._AC_UL600_.jpg"
    ];

    const handleAddToCart = () => {
        addToCart({ id: product.title, title: product.title, img: product.img, price: product.price }, quantity);
        setIsCartOpen(true);
    };

    const handleBuyNow = () => {
        addToCart({ id: product.title, title: product.title, img: product.img, price: product.price }, quantity);
        navigate("/checkout");
    };

    return (
        <div className="min-h-screen flex flex-col text-sm font-sans bg-[#F9FAFB]">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
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
                            <div className="aspect-square w-full max-w-[350px] flex items-center justify-center bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-5">
                                <img src={mainImage} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply transition-opacity duration-300" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex gap-2 sm:gap-3 justify-center">
                                {galleryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg p-1.5 cursor-pointer shadow-sm transition-all ${mainImage === img
                                                ? 'border-2 border-orange-500 opacity-100'
                                                : 'border border-gray-200 hover:border-gray-400 opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="lg:col-span-2 p-5 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100">
                            {product.isBestSeller && (
                                <span className="inline-block bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider w-max mb-3">
                                    Best Seller
                                </span>
                            )}
                            {product.isOverallPick && (
                                <span className="inline-block bg-[#232f3e] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider w-max mb-3">
                                    Overall Pick
                                </span>
                            )}

                            <h1 className="text-[15px] sm:text-[17px] font-bold text-gray-900 leading-snug mb-3">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                                    <span className="font-bold text-[11px] text-gray-900">{product.rating}</span>
                                    <Star size={10} className="text-orange-400" fill="currentColor" />
                                </div>
                                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">{product.reviews} Ratings</span>
                            </div>

                            <div className="mb-5 pb-5 border-b border-gray-100">
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-[11px] font-bold text-gray-600 mt-1">TZS</span>
                                    <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{product.price}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 tracking-wide uppercase">Suggested Retail Price. Includes taxes.</p>
                            </div>

                            {/* Options Mock */}
                            <div className="mb-5">
                                <h3 className="font-bold text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Capacity</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="border-2 border-[#FFD700] bg-orange-50/20 text-gray-900 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors shadow-sm ring-1 ring-[#FFD700] ring-opacity-20">1TB SSD</button>
                                    <button className="border border-gray-200 hover:border-gray-300 bg-white text-gray-600 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors">2TB SSD</button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Memory</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="border-2 border-[#FFD700] bg-orange-50/20 text-gray-900 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors shadow-sm ring-1 ring-[#FFD700] ring-opacity-20">16GB RAM</button>
                                    <button className="border border-gray-200 hover:border-gray-300 bg-white text-gray-600 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors">32GB RAM</button>
                                </div>
                            </div>

                            <div className="space-y-2 mt-auto pt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 text-[11px] font-medium text-gray-700">
                                    <ShieldCheck size={14} className="text-green-600" />
                                    <span><strong>1 Year</strong> Extended Warranty Included</span>
                                </div>
                                <div className="flex items-center gap-3 text-[11px] font-medium text-gray-700">
                                    <RotateCcw size={14} className="text-blue-600" />
                                    <span><strong>30 Days</strong> Free Return Policy</span>
                                </div>
                            </div>
                        </div>

                        {/* Buy Section */}
                        <div className="lg:col-span-1 p-5 sm:p-6 bg-white flex flex-col">
                            <p className="text-[11px] text-gray-600 mb-4 font-bold leading-relaxed">{product.delivery}</p>

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
