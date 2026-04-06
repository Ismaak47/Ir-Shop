import { Header, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems, cartCount } = useCart();
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((total, item) => {
        // Basic formatting assumption, e.g. price string might be "5,000" or similar
        const priceNum = parseFloat(item.price.replace(/,/g, ''));
        return total + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
    }, 0);

    return (
        <div className="min-h-screen flex flex-col text-sm font-sans bg-[#e3e6e6]">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

            <main className="flex-1 max-w-[1000px] mx-auto w-full px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-sm text-center">
                        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-irshop-accent hover:bg-irshop-accent-hover text-black py-2 px-6 rounded-md font-medium transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                                        <img src={item.img} alt={item.title} className="w-20 h-20 object-contain" referrerPolicy="no-referrer" />
                                        <div>
                                            <h4 className="font-medium text-sm line-clamp-2 text-gray-800 mb-1">{item.title}</h4>
                                            <p className="text-gray-500">Qty: {item.quantity}</p>
                                            <p className="font-bold text-lg text-gray-900 mt-1">TZS {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-[300px] bg-white p-6 shadow-sm border border-gray-200 rounded-sm h-fit">
                            <button
                                className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black py-3 rounded-lg font-bold mb-4 shadow-sm"
                                onClick={() => alert("Order placed successfully!")}
                            >
                                Place your order
                            </button>

                            <h3 className="font-bold text-lg mb-2">Order Total</h3>
                            <div className="flex justify-between mb-2">
                                <span>Items ({cartCount}):</span>
                                <span>TZS {totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping & handling:</span>
                                <span>TZS 0</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4 text-orange-700">
                                <span>Order total:</span>
                                <span>TZS {totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
