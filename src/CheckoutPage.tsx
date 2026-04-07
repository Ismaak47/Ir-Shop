import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, MapPin, CreditCard, ShoppingCart, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CheckoutPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { cartItems, cartCount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((total, item) => {
        const priceNum = parseFloat(item.price.replace(/,/g, ''));
        return total + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
    }, 0);

    const handlePlaceOrder = () => {
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            id: Date.now(),
            user: user?.email,
            items: cartItems,
            total: totalAmount,
            date: new Date().toISOString(),
            paymentMethod
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        setOrderPlaced(true);
        setTimeout(() => {
            clearCart();
            navigate('/');
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col text-sm font-sans bg-[#F9FAFB]">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

            <main className="flex-1 max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Order Success Modal */}
                <AnimatePresence>
                    {orderPlaced && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                                <p className="text-gray-600 mb-4">This is a demo order. Your cart has been saved.</p>
                                <p className="text-sm text-gray-500">Redirecting to home...</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => navigate('/games')}
                    className="flex items-center text-gray-500 hover:text-black mb-4 sm:mb-6 transition-colors font-medium text-sm"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to shopping
                </button>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 tracking-tight">Checkout</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-8 sm:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl border border-gray-100 text-center max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-gray-100">
                            <ShoppingCart size={32} className="text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6 text-sm">Looks like you haven't added anything to your cart yet.</p>
                        <button
                            onClick={() => navigate('/games')}
                            className="bg-black hover:bg-gray-800 text-white py-2.5 px-6 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

                        {/* LEFT COLUMN: Order Summary & Info */}
                        <div className="flex-1 w-full space-y-6">

                            {/* Shipping Information Form */}
                            <div className="bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
                                    <MapPin size={20} className="text-[#FFD700]" /> Shipping Information
                                </h2>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                                            <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                                            <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 bg-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
                                        <input type="tel" placeholder="+255 123 456 789" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Shipping Address</label>
                                        <input type="text" placeholder="Street Address (e.g. 123 Kilimanjaro Ave)" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 bg-white mb-3" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="City" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 bg-white" />
                                            <input type="text" placeholder="Postal Code" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all placeholder-gray-400 bg-white" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
                                    <CreditCard size={20} className="text-[#FFD700]" /> Payment Method
                                </h2>
                                <div className="space-y-3">
                                    {/* Option 1: Credit Card */}
                                    <label
                                        className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${paymentMethod === 'card' ? 'border-[#FFD700] bg-orange-50/10 ring-1 ring-[#FFD700]' : 'border-gray-200 hover:border-gray-300'}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border outline-none flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-[#FFD700]' : 'border-gray-300'}`}>
                                                {paymentMethod === 'card' && <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>}
                                            </div>
                                            <span className="font-semibold text-sm text-gray-900">Credit or Debit Card</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#1A1F71] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">VISA</div>
                                            <div className="bg-gray-100 px-1.5 py-0.5 rounded flex items-center shadow-sm">
                                                <div className="w-2.5 h-2.5 bg-[#EB001B] rounded-full mix-blend-multiply"></div>
                                                <div className="w-2.5 h-2.5 bg-[#F79E1B] rounded-full mix-blend-multiply -ml-1"></div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card Details Form */}
                                    <AnimatePresence>
                                        {paymentMethod === 'card' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 shadow-inner">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Card Number</label>
                                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all bg-white" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Expiry Date</label>
                                                            <input type="text" placeholder="MM/YY" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all bg-white" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">CVC</label>
                                                            <input type="text" placeholder="123" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all bg-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Option 2: Mobile Money */}
                                    <label
                                        className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${paymentMethod === 'mobile' ? 'border-[#FFD700] bg-orange-50/10 ring-1 ring-[#FFD700]' : 'border-gray-200 hover:border-gray-300'}`}
                                        onClick={() => setPaymentMethod('mobile')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'mobile' ? 'border-[#FFD700]' : 'border-gray-300'}`}>
                                                {paymentMethod === 'mobile' && <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>}
                                            </div>
                                            <span className="font-semibold text-sm text-gray-900">Mobile Money</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#43B82F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">M-Pesa</div>
                                            <div className="bg-[#E11116] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">Airtel</div>
                                        </div>
                                    </label>

                                    {/* Option 3: PayPal */}
                                    <label
                                        className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${paymentMethod === 'paypal' ? 'border-[#FFD700] bg-orange-50/10 ring-1 ring-[#FFD700]' : 'border-gray-200 hover:border-gray-300'}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'paypal' ? 'border-[#FFD700]' : 'border-gray-300'}`}>
                                                {paymentMethod === 'paypal' && <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>}
                                            </div>
                                            <span className="font-semibold text-sm text-gray-900">PayPal</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-[#00457C] font-extrabold italic text-xs tracking-tighter">Pay<span className="text-[#0079C1]">Pal</span></div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Order Summary ({cartCount} items)</h2>
                                <div className="space-y-5">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 sm:gap-5 group border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-gray-50">
                                                <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <h4 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-3">{item.title}</h4>

                                                <div className="flex flex-row justify-between items-end mt-auto gap-2">
                                                    <div className="text-gray-600 font-medium text-xs bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">Qty: {item.quantity}</div>
                                                    <p className="font-bold text-lg text-gray-900 tracking-tight">TZS {item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Order Total */}
                        <div className="w-full lg:w-[320px] xl:w-[350px] lg:sticky lg:top-24">
                            <div className="bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-5">Order Total</h2>

                                <div className="space-y-3 text-sm text-gray-600 mb-5 border-b border-gray-100 pb-5">
                                    <div className="flex justify-between items-center">
                                        <span>Items ({cartCount}):</span>
                                        <span className="font-medium text-gray-900">TZS {totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Shipping & handling:</span>
                                        <span className="font-medium text-gray-900">TZS 0</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Estimated Tax:</span>
                                        <span className="font-medium text-gray-900">TZS 0</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center font-black text-xl sm:text-2xl text-gray-900 mb-6 tracking-tight">
                                    <span>Total:</span>
                                    <span className="text-orange-600">TZS {totalAmount.toLocaleString()}</span>
                                </div>

                                <button
                                    className="w-full bg-[#FFD700] hover:bg-[#FACC15] text-black py-3.5 rounded-xl font-bold text-base transition-all shadow-[0_2px_10px_rgba(255,215,0,0.3)] hover:shadow-[0_4px_15px_rgba(255,215,0,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                                    onClick={handlePlaceOrder}
                                >
                                    Place your order <ShieldCheck size={18} className="text-black/70" />
                                </button>

                                <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-5 leading-relaxed">
                                    By placing your order, you agree to Ir-Shop's <a href="#" className="text-blue-600 hover:underline hover:text-blue-800">privacy notice</a> and <a href="#" className="text-blue-600 hover:underline hover:text-blue-800">conditions of use</a>.
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
