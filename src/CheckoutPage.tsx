import { Header, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, MapPin, CreditCard, Edit2, ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems, cartCount } = useCart();
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((total, item) => {
        const priceNum = parseFloat(item.price.replace(/,/g, ''));
        return total + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
    }, 0);

    return (
        <div className="min-h-screen flex flex-col text-sm font-sans bg-[#F9FAFB]">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

            <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <button
                    onClick={() => navigate('/games')}
                    className="flex items-center text-gray-500 hover:text-black mb-6 transition-colors font-medium"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to shopping
                </button>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-10 tracking-tight">Checkout</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-12 shadow-sm rounded-2xl border border-gray-100 text-center max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart size={40} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 text-base">Looks like you haven't added anything to your cart yet.</p>
                        <button
                            onClick={() => navigate('/games')}
                            className="bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-xl font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                        {/* LEFT COLUMN: Order Summary & Info */}
                        <div className="flex-1 w-full space-y-8">

                            {/* Dummy Delivery info */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-2xl border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin className="text-[#FFD700]" /> Shipping Address
                                    </h2>
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                        <Edit2 size={14} className="mr-1" /> Edit
                                    </button>
                                </div>
                                <div className="text-gray-600 text-base leading-relaxed pl-8">
                                    <p className="font-semibold text-gray-900">John Doe</p>
                                    <p>123 Kilimanjaro Ave, P.O. Box 456</p>
                                    <p>Dar es Salaam, Tanzania</p>
                                </div>
                            </div>

                            {/* Dummy Payment info */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-2xl border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <CreditCard className="text-[#FFD700]" /> Payment Method
                                    </h2>
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                        <Edit2 size={14} className="mr-1" /> Edit
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 pl-8">
                                    <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center font-bold text-[10px] text-gray-500">
                                        VISA
                                    </div>
                                    <div className="text-gray-600 text-base">
                                        <p className="font-medium text-gray-900">Visa ending in 4242</p>
                                        <p className="text-sm">Expires 12/28</p>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-2xl border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary ({cartCount} items)</h2>
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row gap-6 sm:gap-8 group border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <div className="w-full sm:w-40 sm:h-40 bg-gray-50 rounded-xl flex items-center justify-center p-4 flex-shrink-0">
                                                <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                                            </div>
                                            <div className="flex flex-col flex-1 py-1">
                                                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                                {/* Text intentionally matching the user's specific prompt duplication for styling precision */}
                                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 md:line-clamp-none">{item.title}</p>

                                                <div className="flex flex-row justify-between items-end mt-auto">
                                                    <div className="text-gray-700 font-medium text-sm bg-gray-100 px-3 py-1 rounded-md">Qty: {item.quantity}</div>
                                                    <p className="font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">TZS {item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Order Total */}
                        <div className="w-full lg:w-[380px] xl:w-[420px] lg:sticky lg:top-28">
                            <div className="bg-white p-6 sm:p-8 shadow-xl rounded-3xl border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Total</h2>

                                <div className="space-y-4 text-base text-gray-600 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span>Items ({cartCount}):</span>
                                        <span className="font-medium text-gray-900">TZS {totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Shipping & handling:</span>
                                        <span className="font-medium text-gray-900">TZS 0</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                                        <span>Estimated Tax:</span>
                                        <span className="font-medium text-gray-900">TZS 0</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center font-black text-2xl sm:text-3xl text-gray-900 mb-8 tracking-tight">
                                    <span>Order total:</span>
                                    <span className="text-orange-600">TZS {totalAmount.toLocaleString()}</span>
                                </div>

                                <button
                                    className="w-full bg-[#FFD700] hover:bg-[#FACC15] text-black py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_rgba(255,215,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                                    onClick={() => alert("Order placed successfully!")}
                                >
                                    Place your order <ShieldCheck size={20} className="text-black/70" />
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
                                    By placing your order, you agree to Ir-Shop's <a href="#" className="text-blue-600 hover:underline">privacy notice</a> and <a href="#" className="text-blue-600 hover:underline">conditions of use</a>.
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
