import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCart, CartItem, clearCart, addOrder } from "./lib/store";
import { ChevronLeft, Lock, CreditCard, Smartphone, CheckCircle, ShieldCheck } from "lucide-react";
import { Logo } from "./components/Header";
import { motion } from "motion/react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mobile_money");

  useEffect(() => {
    const items = getCart();
    if (items.length === 0 && !orderPlaced) {
      navigate("/games");
    }
    setCartItems(items);
  }, [navigate, orderPlaced]);

  const cartTotal = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/,/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const shippingCost = cartTotal > 500000 ? 0 : 15000;
  const finalTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    
    // Save order
    const newOrder = addOrder({
      userId: 'u2', // Default user for now
      items: cartItems,
      total: finalTotal,
      status: 'Pending',
      shippingAddress: {
        // Collect from form if needed, but for now just save
      }
    });
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setIsPlacingOrder(false);
      setOrderPlaced(true);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-sm text-gray-600 mb-6">
            Thank you for shopping with Ir-Shop. Your order has been successfully placed and is being processed.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Order Number</p>
            <p className="text-sm font-mono font-medium text-gray-900">#IR-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <Link 
            to="/"
            className="block w-full bg-irshop-teal hover:bg-opacity-90 text-white py-3 rounded-md text-sm font-bold transition-colors"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Checkout Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/games" className="flex items-center gap-1 text-sm text-gray-600 hover:text-irshop-teal transition-colors">
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Back to shopping</span>
          </Link>
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-1.5 text-green-700">
            <Lock size={16} />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Forms */}
          <div className="flex-1 space-y-6">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Contact Info */}
              <section className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-irshop-teal text-white flex items-center justify-center text-xs">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irshop-teal/50 focus:border-irshop-teal transition-shadow" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required type="tel" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irshop-teal/50 focus:border-irshop-teal transition-shadow" placeholder="+255 700 000 000" />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-irshop-teal text-white flex items-center justify-center text-xs">2</span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irshop-teal/50 focus:border-irshop-teal transition-shadow" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irshop-teal/50 focus:border-irshop-teal transition-shadow" placeholder="123 Main St, Apartment 4B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">City / District</label>
                      <input required type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irshop-teal/50 focus:border-irshop-teal transition-shadow" placeholder="Dar es Salaam" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
                      <select required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irshop-teal/50 focus:border-irshop-teal transition-shadow bg-white">
                        <option value="">Select Region</option>
                        <option value="dar">Dar es Salaam</option>
                        <option value="arusha">Arusha</option>
                        <option value="dodoma">Dodoma</option>
                        <option value="mwanza">Mwanza</option>
                        <option value="zanzibar">Zanzibar</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-irshop-teal text-white flex items-center justify-center text-xs">3</span>
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'mobile_money' ? 'border-irshop-teal bg-irshop-teal/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="mobile_money" 
                      checked={paymentMethod === 'mobile_money'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-irshop-teal focus:ring-irshop-teal border-gray-300"
                    />
                    <div className="ml-3 flex-1 flex items-center justify-between">
                      <div>
                        <span className="block text-sm font-medium text-gray-900">Mobile Money</span>
                        <span className="block text-xs text-gray-500">M-Pesa, Tigo Pesa, Airtel Money</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-4 object-contain" referrerPolicy="no-referrer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tigo_logo.svg/512px-Tigo_logo.svg.png" alt="Tigo Pesa" className="h-4 object-contain" referrerPolicy="no-referrer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Airtel_logo.svg/512px-Airtel_logo.svg.png" alt="Airtel Money" className="h-4 object-contain" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  </label>
                </div>
              </section>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-base font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 flex items-center justify-center p-1 flex-shrink-0">
                      <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-xs font-bold text-gray-900">TZS {item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">TZS {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">{shippingCost === 0 ? 'Free' : `TZS ${shippingCost.toLocaleString()}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">TZS</span>
                    <span className="text-xl font-bold text-gray-900">{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={isPlacingOrder}
                className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-3.5 rounded-md text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Place Order
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-gray-500 mt-3">
                By placing your order, you agree to Ir-Shop's privacy notice and conditions of use.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
