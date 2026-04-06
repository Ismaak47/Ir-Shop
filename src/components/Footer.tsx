import { Facebook, Instagram, Music2 as Tiktok } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className="bg-[#37475a] hover:bg-[#485769] text-white py-4 text-center w-full transition-colors font-medium"
      >
        Back to top
      </button>

      {/* Modern Footer */}
      <footer className="irshop-footer">
        <div className="irshop-footer-container">
          <div className="irshop-footer-grid">
            <div className="irshop-footer-col">
              <h4>Get to Know Us</h4>
              <ul>
                <li><a href="#">About Ir-Shop</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Investor Relations</a></li>
                <li><a href="#">Ir-Shop Devices</a></li>
                <li><a href="#">Ir-Shop Science</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Make Money with Us</h4>
              <ul>
                <li><a href="#">Sell products on Ir-Shop</a></li>
                <li><a href="#">Sell on Ir-Shop Business</a></li>
                <li><a href="#">Sell apps on Ir-Shop</a></li>
                <li><a href="#">Become an Affiliate</a></li>
                <li><a href="#">Advertise Your Products</a></li>
                <li><a href="#">Self-Publish with Us</a></li>
                <li><a href="#">Host an Ir-Shop Hub</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Ir-Shop Payment Products</h4>
              <ul>
                <li><a href="#">Ir-Shop Business Card</a></li>
                <li><a href="#">Shop with Points</a></li>
                <li><a href="#">Reload Your Balance</a></li>
                <li><a href="#">Ir-Shop Currency Converter</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Let Us Help You</h4>
              <ul>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Your Orders</a></li>
                <li><a href="#">Shipping Rates & Policies</a></li>
                <li><a href="#">Returns & Replacements</a></li>
                <li><a href="#">Manage Your Content</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
            <div className="irshop-footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Customer Service</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Track Order</a></li>
              </ul>
            </div>
          </div>

          <div className="irshop-footer-middle">
            <div className="irshop-footer-middle-content">
              <div className="irshop-footer-social">
                <a href="#" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="TikTok">
                  <Tiktok size={18} />
                </a>
              </div>

              <div className="irshop-footer-payment">
                <div className="irshop-footer-payment-icons flex gap-2">
                  <div className="w-10 h-6 bg-[#1A1F71] rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center overflow-hidden">
                    <div className="w-4 h-4 bg-red-600 rounded-full -mr-1"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded-full opacity-80"></div>
                  </div>
                  <div className="w-10 h-6 bg-[#003087] rounded flex items-center justify-center text-[7px] font-bold text-white italic">PayPal</div>
                </div>
              </div>
            </div>
          </div>

          <div className="irshop-footer-bottom">
            <div className="irshop-footer-bottom-right">
              <span>© 2026 Ir-Shop. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
