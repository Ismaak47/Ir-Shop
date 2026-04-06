import { Header, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, MapPin, CreditCard, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CheckoutPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
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

                            {/* Shipping Information Form */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-2xl border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                    <MapPin className="text-[#FFD700]" /> Shipping Information
                                </h2>
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                            <input type="text" placeholder="John Doe" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                            <input type="email" placeholder="john@example.com" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                        <input type="tel" placeholder="+255 123 456 789" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Shipping Address</label>
                                        <input type="text" placeholder="Street Address (e.g. 123 Kilimanjaro Ave)" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 mb-4" />
                                        <div className="grid grid-cols-2 gap-5">
                                            <input type="text" placeholder="City" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                            <input type="text" placeholder="Postal Code" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-2xl border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                    <CreditCard className="text-[#FFD700]" /> Payment Method
                                </h2>
                                <div className="space-y-3">
                                    {/* Option 1: Credit Card */}
                                    <label
                                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${paymentMethod === 'card' ? 'border-[#FFD700] bg-orange-50/20 ring-1 ring-[#FFD700]' : 'border-gray-200 hover:border-gray-300'}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border outline-none flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-[#FFD700]' : 'border-gray-300'}`}>
                                                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FFD700] rounded-full"></div>}
                                            </div>
                                            <span className="font-semibold text-gray-900">Credit or Debit Card</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#1A1F71] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">VISA</div>
                                            <div className="bg-gray-100 px-2 py-0.5 rounded flex items-center shadow-sm">
                                                <div className="w-3 h-3 bg-[#EB001B] rounded-full mix-blend-multiply"></div>
                                                <div className="w-3 h-3 bg-[#F79E1B] rounded-full mix-blend-multiply -ml-1"></div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card Details Form (Only shows when 'card' is selected) */}
                                    <AnimatePresence>
                                        {paymentMethod === 'card' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4 shadow-inner">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Card Number</label>
                                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                                                            <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">CVC</label>
                                                            <input type="text" placeholder="123" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Option 2: Mobile Money */}
                                    <label
                                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${paymentMethod === 'mobile' ? 'border-[#FFD700] bg-orange-50/20 ring-1 ring-[#FFD700]' : 'border-gray-200 hover:border-gray-300'}`}
                                        onClick={() => setPaymentMethod('mobile')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'mobile' ? 'border-[#FFD700]' : 'border-gray-300'}`}>
                                                {paymentMethod === 'mobile' && <div className="w-2.5 h-2.5 bg-[#FFD700] rounded-full"></div>}
                                            </div>
                                            <span className="font-semibold text-gray-900">Mobile Money</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#43B82F] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">M-Pesa</div>
                                            <div className="bg-[#E11116] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Airtel</div>
                                        </div>
                                    </label>

                                    {/* Option 3: PayPal */}
                                    <label
                                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${paymentMethod === 'paypal' ? 'border-[#FFD700] bg-orange-50/20 ring-1 ring-[#FFD700]' : 'border-gray-200 hover:border-gray-300'}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'paypal' ? 'border-[#FFD700]' : 'border-gray-300'}`}>
                                                {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-[#FFD700] rounded-full"></div>}
                                            </div>
                                            <span className="font-semibold text-gray-900">PayPal</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-[#00457C] font-extrabold italic text-sm tracking-tighter">Pay<span className="text-[#0079C1]">Pal</span></div>
                                        </div>
                                    </label>
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
