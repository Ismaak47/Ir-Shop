import { Star, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Header, Sidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";

const GameProductCard = ({ 
  title, 
  img, 
  rating, 
  reviews, 
  price, 
  delivery, 
  isBestSeller = false,
  isOverallPick = false,
  key
}: { 
  title: string, 
  img: string, 
  rating: number, 
  reviews: string, 
  price: string, 
  delivery: string,
  isBestSeller?: boolean,
  isOverallPick?: boolean,
  key?: number
}) => (
  <div className="bg-white p-2 sm:p-4 flex flex-col h-full shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow relative" key={key}>
    {isBestSeller && (
      <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-sm z-10">
        Best Seller
      </div>
    )}
    {isOverallPick && (
      <div className="absolute top-0 left-0 bg-[#232f3e] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-sm z-10">
        Overall Pick
      </div>
    )}
    
    <div className="aspect-square mb-2 sm:mb-3 overflow-hidden flex items-center justify-center">
      <img src={img} alt={title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
    </div>
    
    <div className="flex-1 flex flex-col">
      <h3 className="text-[11px] sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 mb-1 hover:text-orange-600 cursor-pointer leading-tight sm:leading-normal">{title}</h3>
      
      <div className="flex items-center gap-1 mb-1">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="sm:w-[14px] sm:h-[14px]" fill={i < Math.floor(rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-[10px] sm:text-xs text-blue-600 hover:text-orange-600 cursor-pointer">{reviews}</span>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="text-[10px] sm:text-xs font-bold self-start mt-0.5 sm:mt-1">TZS</span>
          <span className="text-base sm:text-2xl font-bold">{price}</span>
        </div>
        
        <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1">{delivery}</p>
        
        <button className="w-full bg-irshop-accent hover:bg-irshop-accent-hover text-black py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors shadow-sm">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

export default function GamesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const products = [
    {
      title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms Display, NVIDIA® GeForce RTX™ 5060 Laptop GPU, Intel® Core™ i7 Processor 14650HX, 16GB DDR5, 1TB Gen 4 SSD, Wi-Fi 7, Windows 11 Home",
      img: "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "389",
      price: "3,639,974",
      delivery: "TZS 244,088 delivery Fri, Apr 24",
      isOverallPick: true
    },
    {
      title: "Lenovo Legion Tower 5i – AI-Powered Gaming PC - Intel® Core Ultra 7 265F Processor – NVIDIA® GeForce RTX™ 5070 Ti Graphics – 32 GB Memory – 1 TB Storage – 3 Months of PC GamePass",
      img: "https://m.media-amazon.com/images/I/51XekLq5PxL._AC_UL800_.jpg",
      rating: 4.7,
      reviews: "72",
      price: "6,187,974",
      delivery: "TZS 680,914 delivery Fri, Apr 24"
    },
    {
      title: "13.5\" Portable Monitor 2256x1504 IPS Laptop Screen, Slim Lightweight Dual USB C HDMI Computer Gaming Display with Speakers, Travel Monitor for PC Phone PS5/4 Xbox Switch",
      img: "https://m.media-amazon.com/images/I/61Zxsgm+qWL._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "New",
      price: "228,800",
      delivery: "TZS 137,670 delivery Thu, Apr 16"
    },
    {
      title: "Amazon Basics 27 inch Gaming Monitor, FHD 1080P, 165Hz, VESA Compatible, Adaptive sync, 1ms Response, Black",
      img: "https://m.media-amazon.com/images/I/81Pz0DcfP3L._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "797",
      price: "374,374",
      delivery: "TZS 451,204 delivery Thu, Apr 16"
    },
    {
      title: "ASUS ROG Xbox Ally – 7” 1080p 120Hz Touchscreen Gaming Handheld, 3-month Xbox Game Pass Premium included, AMD Ryzen Z2 A, 16GB RAM, 512GB SSD, White",
      img: "https://m.media-amazon.com/images/I/61gZGeavWGL._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "307",
      price: "1,299,974",
      delivery: "TZS 145,756 delivery Wed, Apr 15"
    },
    {
      title: "Alienware 16 Aurora Laptop AC16250-16-inch 16:10 WQXGA Display, Intel Core 7-240H Series 2, 16GB DDR5 RAM, 1TB SSD, NVIDIA GeForce RTX 5060 8GB GDDR7, Windows 11 Home, Onsite Service - Blue",
      img: "https://m.media-amazon.com/images/I/71LIpVe8h6L._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "116",
      price: "2,846,662",
      delivery: "Contact for shipping"
    },
    {
      title: "WOLFBOX MegaFlow 50 Compressed Air Duster-110000RPM Super Power Electric Air Duster, 3-Gear Adjustable Mini Blower with Fast Charging, Dust Blower for Computer, Keyboard, House, Outdoor and Car",
      img: "https://m.media-amazon.com/images/I/713BEhBxXWL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "9,986",
      price: "103,974",
      delivery: "TZS 114,218 delivery Wed, Apr 15",
      isBestSeller: true
    },
    {
      title: "Lenovo Legion Pro 7i – AI-Powered Gaming Laptop – Intel® Core Ultra 7 255HX – 16\" WQXGA PureSight OLED Display – 240Hz – NVIDIA® GeForce RTX™ 5070 Ti – 32GB Memory – 2TB Storage – PC GamePass",
      img: "https://m.media-amazon.com/images/I/81SKqogPgCL._AC_UL800_.jpg",
      rating: 4.0,
      reviews: "44",
      price: "5,160,896",
      delivery: "TZS 243,438 delivery Fri, Apr 24"
    },
    {
      title: "Alienware Aurora Gaming Desktop ACT1250 - Intel Core Ultra 9 285 Processor, Liquid Cooled, NVIDIA GeForce RTX 5080, 32GB DDR5 RAM, 1TB SSD, 1000W Platinum Rated PSU, Windows 11 Home - Clear Panel",
      img: "https://m.media-amazon.com/images/I/71MvbQRvOuL._AC_UL800_.jpg",
      rating: 4.0,
      reviews: "103",
      price: "6,887,400",
      delivery: "Contact for shipping"
    },
    {
      title: "ASUS TUF Gaming F16 (2025) Gaming Laptop, 16” FHD+ 165Hz 16:10 Display, Intel® Core™ i5 Processor 13450HX, NVIDIA® GeForce RTX™ 5050, 16GB DDR5, 512GB PCIe Gen4 SSD, Wi-Fi 6E, Win 11 Home",
      img: "https://m.media-amazon.com/images/I/71cjDQIKaPL._AC_UL800_.jpg",
      rating: 4.0,
      reviews: "25",
      price: "2,859,974",
      delivery: "TZS 225,030 delivery Wed, Apr 15"
    },
    {
      title: "ASUS TUF Gaming Series 5 24.5” 1080P Monitor (VG259QM5A) – Full HD, Fast-IPS, 240Hz, 0.3ms, G-SYNC Compatible, FreeSync Premium, 99% sRGB, DisplayWidget, Gaming AI, 3 yr Warranty",
      img: "https://m.media-amazon.com/images/I/71aaIpb0BuL._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "19",
      price: "387,400",
      delivery: "TZS 351,260 delivery Apr 27 - May 28"
    },
    {
      title: "SAMSUNG 32\" Odyssey G55C Series QHD 1000R Curved Gaming Monitor, 1ms(MPRT), HDR10, 165Hz, AMD Radeon FreeSync, Eye Care, Glare Free, Sharp Resolution LS32CG550ENXZA",
      img: "https://m.media-amazon.com/images/I/81cYQ1dO5xL._AC_UL800_.jpg",
      rating: 4.4,
      reviews: "1,607",
      price: "519,974",
      delivery: "TZS 532,792 delivery Wed, Apr 15"
    },
    {
      title: "BladeHawks Extra Large RGB Gaming Mouse Pad-14 Light Modes, Extended Soft LED Mouse Pad, Anti-Slip Rubber Base, Computer Keyboard Mousepad Mat (31.5 x 12 Inch)",
      img: "https://m.media-amazon.com/images/I/51UsbIj9HAL._AC_UL800_.jpg",
      rating: 4.7,
      reviews: "15,660",
      price: "38,974",
      delivery: "TZS 121,368 delivery Wed, Apr 15"
    },
    {
      title: "ASUS TUF Gaming F16 Gaming Laptop, 16” FHD+ 144Hz IPS-Level 16:10 Display, Intel® Core™ 5 210H, NVIDIA® GeForce RTX™ 4050, 16GB DDR5, 512GB PCIe Gen4 SSD, Wi-Fi 6, Win11 Home, FX607VU-SS53",
      img: "https://m.media-amazon.com/images/I/71ZEi4fMrzL._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "197",
      price: "2,516,800",
      delivery: "TZS 215,540 delivery Wed, Apr 15"
    },
    {
      title: "Lenovo Legion Tower 5i – AI-Powered Gaming PC - Intel® Core Ultra 7 265F Processor – NVIDIA® GeForce RTX™ 5060 Ti Graphics – 16 GB Memory – 1 TB Storage – 3 Months of PC GamePass",
      img: "https://m.media-amazon.com/images/I/41FNOf33+nL._AC_UL800_.jpg",
      rating: 4.1,
      reviews: "27",
      price: "3,928,574",
      delivery: "TZS 712,738 delivery Fri, Apr 24"
    },
    {
      title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” ROG Nebula 16:10 2.5K 240Hz/3ms, NVIDIA® GeForce RTX™ 5080, Intel® Core Ultra 9 275HX, 32GB DDR5, 1TB PCIe Gen 4 SSD, Wi-Fi 7, Windows 11 Home, G615LW-AS96",
      img: "https://m.media-amazon.com/images/I/71WH7jtyWpL._AC_UL800_.jpg",
      rating: 3.9,
      reviews: "79",
      price: "7,439,068",
      delivery: "TZS 247,988 delivery Apr 14 - 29"
    },
    {
      title: "ASUS ROG Strix G18 (2025) Gaming Laptop, 18” ROG Nebula 16:10 2.5K 240Hz/3ms, NVIDIA® GeForce RTX™ 5070, Intel® Core™ Ultra 9 275HX, 32GB DDR5-5600, 2TB PCIe Gen 4 SSD, Wi-Fi 7, Windows 11 Pro",
      img: "https://m.media-amazon.com/images/I/81mRCWvzUTL._AC_UL800_.jpg",
      rating: 4.1,
      reviews: "34",
      price: "5,977,400",
      delivery: "TZS 266,786 delivery Fri, Apr 24"
    },
    {
      title: "msi Katana 15 HX 15.6” 165Hz QHD+ Gaming Laptop: Intel Core i9-14900HX, NVIDIA Geforce RTX 5070, 32GB DDR5, 1TB NVMe SSD, RGB Keyboard, Win 11 Home: Black B14WGK-016US",
      img: "https://m.media-amazon.com/images/I/71TvKdAmIjL._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "267",
      price: "4,367,974",
      delivery: "TZS 227,240 delivery Fri, Apr 24"
    },
    {
      title: "Led Light Bar with Music Sync, Color Changing TV Backlight App & Remote Control, IC+RGB & W Smart RGB Light Bar, USB Powered Led Lights for TV, PC Room Monitor Backlight Gaming Accessories",
      img: "https://m.media-amazon.com/images/I/51iuieCuxSL._AC_UL800_.jpg",
      rating: 4.4,
      reviews: "260",
      price: "25,974",
      delivery: "TZS 112,190 delivery Wed, Apr 15"
    },
    {
      title: "Wired Gaming Earbuds, Ak3file in Ear Monitors, Deep Bass Sound Wired Earbuds, HiFi in Ear Headphones with 1DD 10mm Dynamic Driver, IEM for Music Gaming Video Calling (Black)",
      img: "https://m.media-amazon.com/images/I/619bBByro4L._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "1,072",
      price: "25,974",
      delivery: "TZS 105,144 delivery Wed, Apr 15"
    },
    {
      title: "Amazon Basics Large Extended Computer Rectangular Mouse Pad, 16.7 x 35.7 inch, Black",
      img: "https://m.media-amazon.com/images/I/51XGotAiYYL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "64,811",
      price: "36,348",
      delivery: "TZS 127,452 delivery Wed, Apr 15"
    },
    {
      title: "Samsung 27” Odyssey OLED G6 G60SF QHD QD-OLED Gaming Monitor, 500Hz Refresh Rate, 0.03ms (GtG) Response Time, G-Sync Compatible, VESA DisplayHDR TrueBlack 500, LS27FG602SNXZA, 2025, 3 Yr Warranty",
      img: "https://m.media-amazon.com/images/I/81pwfttOorL._AC_UL800_.jpg",
      rating: 4.1,
      reviews: "62",
      price: "2,391,974",
      delivery: "TZS 500,266 delivery Wed, Apr 15"
    },
    {
      title: "Samsung 27” Odyssey OLED G6 (G61SD) QHD & QD-OLED 240Hz 0.03ms FreeSync Premium Pro Gaming Monitor with Sleek Metal Design, 3 Year Warranty, US, LS27DG610SNXZA",
      img: "https://m.media-amazon.com/images/I/8127skgs+ML._AC_UL800_.jpg",
      rating: 4.3,
      reviews: "305",
      price: "2,079,974",
      delivery: "TZS 460,148 delivery Wed, Apr 15"
    },
    {
      title: "Samsung 27” Odyssey OLED G5 (G50SF) QHD & QD-OLED Gaming Monitor, 180Hz Refresh Rate, 0.03ms (GtG) Response Time, NVIDIA G-Sync Compatible, AMD FreeSync™, LS27FG500SNXZA",
      img: "https://m.media-amazon.com/images/I/818+AiwCClL._AC_UL800_.jpg",
      rating: 4.4,
      reviews: "265",
      price: "1,117,974",
      delivery: "TZS 301,496 delivery Wed, Apr 15"
    },
    {
      title: "Frigidaire Gaming Light Up Mini Beverage Refrigerator, 6 can, 4 liters, Cooler with large see through door and LED lights Perfect for Gaming Experience, Home, Office, or Cars.12V Charger (Stealth)",
      img: "https://m.media-amazon.com/images/I/71yl7YJUTKL._AC_UL800_.jpg",
      rating: 4.0,
      reviews: "954",
      price: "97,266",
      delivery: "TZS 180,596 delivery Apr 13 - 20"
    },
    {
      title: "HUANUO FlowLift™ Dual Monitor Stand, Fully Adjustable Gaming Monitor Desk Mount for 13–32″ Computer Screens, Full Motion VESA 75x75/100x100 with C-Clamp & Grommet Base, Each Arm Holds 4.4 to 19.8 lbs",
      img: "https://m.media-amazon.com/images/I/7182jSFV25L._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "33,753",
      price: "168,974",
      delivery: "Contact for shipping"
    },
    {
      title: "acer Nitro V Gaming Laptop | Intel Core i5-13420H Processor | NVIDIA GeForce RTX 4050 Laptop GPU | 15.6\" FHD IPS 165Hz Display | 8GB DDR5 | 512GB Gen 4 SSD | Wi-Fi 6 | Backlit KB | ANV15-52-586Z",
      img: "https://m.media-amazon.com/images/I/71gXelI8upL._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "270",
      price: "1,949,974",
      delivery: "TZS 208,416 delivery Wed, Apr 15"
    },
    {
      title: "ROG NUC (2025) Gaming Mini PC with Intel® Core™ Ultra 9 (Series 2) ARL-HX CPU, NVIDIA® GeForce RTX™ 5070 Ti MobileGPU, 16GB DDR5 RAM, 1TB NVMe SSD, Thunderbolt 4 Triple-Fan Cooling and ARGB Lighting",
      img: "https://m.media-amazon.com/images/I/71VgxM1WSXL._AC_UL800_.jpg",
      rating: 5.0,
      reviews: "3",
      price: "9,446,840",
      delivery: "TZS 272,116 delivery Fri, Apr 24"
    },
    {
      title: "KTC 27\" 4K UHD 144Hz Gaming Monitor - Fast IPS Panel 160Hz 1ms GTG, HDR400 132% sRGB, HDMI2.1/DP1.4, VESA Mount, Height/Tilt/Pivot/Swivel Stand, Vertical Monitor Ideal for Gamers, Designers",
      img: "https://m.media-amazon.com/images/I/71Ie-0tsggL._AC_UL800_.jpg",
      rating: 4.3,
      reviews: "114",
      price: "779,974",
      delivery: "TZS 486,330 delivery Thu, Apr 16"
    },
    {
      title: "BOSGAME P3 Mini Gaming PC AMD Ryzen 7 7840HS | 32GB DDR5 RAM | 1TB PCIe 4.0 NVMe SSD | Dual Gigabit Ethernet | Triple Display (HDMI/DP/USB-C) | AX210 Wi-Fi 6E | BT 5.2 | Compact Desktop Computer",
      img: "https://m.media-amazon.com/images/I/81yUFWcLXRL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "30",
      price: "1,481,974",
      delivery: "TZS 140,036 delivery Thu, Apr 16"
    },
    {
      title: "Puro Sound Labs Wireless Gaming Headset - Easy to Pair with 2.4GHz USB, Volume-Limited, Tri-Mode Connectivity, Detachable Mic, 32-Hour Battery, Wireless Headphones with mic for PC- PuroGamer-BT, Black",
      img: "https://m.media-amazon.com/images/I/81L7Ck1WgKL._AC_UL800_.jpg",
      rating: 4.4,
      reviews: "8",
      price: "257,400",
      delivery: "TZS 129,818 delivery Wed, Apr 15"
    },
    {
      title: "Wired Gaming Mouse,Ergonomic 8000 DPI Optical Gaming Mice with 12 RGB Backlit Modes, 6 Programmable Buttons, DIY Software for PC Gamer & Office",
      img: "https://m.media-amazon.com/images/I/51NuotNEd6L._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "56",
      price: "49,374",
      delivery: "TZS 112,190 delivery Wed, Apr 15"
    },
    {
      title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms, NVIDIA® GeForce RTX™ 5050, Intel® Core™ i5-13450HX, 16GB DDR5-5600, 1TB PCIe Gen 4 SSD, Wi-Fi 7, Windows 11 Home, G615JH-DS54",
      img: "https://m.media-amazon.com/images/I/61LlFyN+B3L._AC_UL800_.jpg",
      rating: 4.8,
      reviews: "45",
      price: "3,455,400",
      delivery: "TZS 243,568 delivery Fri, Apr 24"
    },
    {
      title: "acer Nitro V Gaming Laptop | Intel Core i7-13620H Processor | NVIDIA GeForce RTX 4050 Laptop GPU | 15.6\" FHD IPS 165Hz Display | 16GB DDR5 | 1TB Gen 4 SSD | Wi-Fi 6 | Backlit KB | ANV15-52-76NK",
      img: "https://m.media-amazon.com/images/I/719MpRszpCL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "247",
      price: "2,599,974",
      delivery: "TZS 194,662 delivery Wed, Apr 15"
    },
    {
      title: "ASUS TUF Gaming F16 (2025) Gaming Laptop, 16” FHD+ 165Hz IPS-Level 16:10 Display, Intel® Core™ i7 Processor 14650HX, NVIDIA® GeForce RTX™ 5050, 16GB DDR5, 1TB PCIe Gen4 SSD, Wi-Fi 6E, Windows 11 Home",
      img: "https://m.media-amazon.com/images/I/71cjDQIKaPL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "45",
      price: "3,377,400",
      delivery: "TZS 226,460 delivery Fri, Apr 24"
    },
    {
      title: "UGREEN Cat 8 Ethernet Cable 6FT, High Speed Braided 40Gbps 2000Mhz Network Cord Cat8 RJ45 Shielded Indoor Heavy Duty LAN Cables Compatible with Gaming PC PS5 PS4 PS3 Xbox Modem Router 6FT",
      img: "https://m.media-amazon.com/images/I/712GA0EBfIL._AC_UL800_.jpg",
      rating: 4.7,
      reviews: "56,329",
      price: "18,174",
      delivery: "TZS 108,134 delivery Wed, Apr 15",
      isBestSeller: true
    },
    {
      title: "STGAubron Gaming PC Desktop, Intel Core i7 up to 3.9GHz, GeForce RTX 3050 6G, 16GB RAM, 512GB SSD, WiFi 6, BT 5.0, RGB Fan x6, Windows 11 Home",
      img: "https://m.media-amazon.com/images/I/713XidebesL._AC_UL800_.jpg",
      rating: 3.7,
      reviews: "252",
      price: "1,663,974",
      delivery: "TZS 567,476 delivery Wed, Apr 15"
    },
    {
      title: "Raijintek MGA-68 Black, 65% TKL Magnetic Switch Gaming Keyboard, Wired, 69 Keys, Hot-Swappable, CNC Aluminum Frame, Customizable ARGB Lighting, USB-C, Compatible with Windows & Mac (0R40B00275)",
      img: "https://m.media-amazon.com/images/I/71pmVGTqEfL._AC_UL800_.jpg",
      rating: 3.6,
      reviews: "8",
      price: "311,740",
      delivery: "TZS 160,290 delivery Thu, Apr 16"
    },
    {
      title: "Skytech Gaming Rampage Desktop PC, Intel i7 14700F 2.1 GHz (5.3GHz), AMD RX 9070XT 16GB, 1TB Gen4 NVMe SSD, 32GB DDR5 RAM 5600 RGB, 850W Gold PSU, 360mm ARGB AIO, Wi-Fi, Win 11",
      img: "https://m.media-amazon.com/images/I/71CFImi-U4L._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "30",
      price: "5,719,974",
      delivery: "TZS 825,292 delivery Fri, Apr 24"
    },
    {
      title: "msi Aegis ZS2 Gaming Desktop | AMD 12-core Zen 5 Ryzen 9 9900X | 64GB DDR5 8TB SSD | GeForce RTX 5080 DLSS 4 | 360mm Liquid Cooler 850W 80+ Gold PSU Support HDD Wi-Fi 7 Win11 Pro w/DLCA Accessory",
      img: "https://m.media-amazon.com/images/I/71mSw0yRL2L._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "6",
      price: "11,749,400",
      delivery: "Contact for shipping"
    },
    {
      title: "Corsair Vengeance a5100 Gaming PC – Liquid Cooled AMD Ryzen 7 7800X3D CPU – NVIDIA GeForce RTX 5080 GPU – 32GB Dominator Titanium RGB DDR5 Memory – 2TB M.2 SSD – Black",
      img: "https://m.media-amazon.com/images/I/711LRMTxCSL._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "5",
      price: "11,439,974",
      delivery: "TZS 715,884 delivery Apr 20 - May 11"
    },
    {
      title: "LISEN Cell Phone Stand Phone Holder for Desk Office Decor, Office Desk Accessories Women PC Gaming Essentials iPhone Stand Gadgets Men Gifts for Kids Fit OtterBox Case Switch iPad Air Tablet 4-10 in",
      img: "https://m.media-amazon.com/images/I/61KD4hoirXL._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "70,447",
      price: "25,974",
      delivery: "TZS 113,178 delivery Wed, Apr 15"
    },
    {
      title: "ASUS ROG Rapture GT-BE98 PRO First Quad-Band WiFi 7 Gaming Router supports 320MHz, Dual 10G Port, Triple-level Game Acceleration, Mobile Game Mode, Subscription-Free Security, AiMesh, and VPN features",
      img: "https://m.media-amazon.com/images/I/71mCbhfOTJL._AC_UL800_.jpg",
      rating: 4.1,
      reviews: "445",
      price: "1,554,774",
      delivery: "TZS 225,940 delivery Wed, Apr 15"
    },
    {
      title: "Exquisite Gaming: Call of Duty: Monkeybomb - Original Mobile Phone & Gaming Controller Holder, Device Stand, Cable Guys, Licensed Figure",
      img: "https://m.media-amazon.com/images/I/51LU5w+h2gL._AC_UL800_.jpg",
      rating: 4.8,
      reviews: "2,313",
      price: "64,974",
      delivery: "TZS 137,670 delivery Wed, Apr 15"
    },
    {
      title: "KDD Headphone & Controller Stand with Wireless Charging - Rotatable Headset Stand with 9 Light Modes - Controller Holder with 2 USB and Type C Ports - for Gamers Desktop Accessories",
      img: "https://m.media-amazon.com/images/I/61JI6UgtcJL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "794",
      price: "77,948",
      delivery: "TZS 131,560 delivery Wed, Apr 15"
    },
    {
      title: "Razer Viper V4 Pro Wireless Esports Gaming Mouse: 49g Ultra Lightweight, Fast & Precise, 50K DPI Optical Sensor, 8K Polling, Gen-4 Optical Switches, Scroll Wheel, USB-C Charging, for PC & Mac - Black",
      img: "https://m.media-amazon.com/images/I/51Vqc9mwhLL._AC_UL800_.jpg",
      rating: 4.8,
      reviews: "32",
      price: "415,974",
      delivery: "TZS 119,210 delivery Wed, Apr 15"
    },
    {
      title: "AULA F75 Pro Wireless Mechanical Keyboard,75% Hot Swappable Custom Keyboard with Knob,RGB Backlit,Pre-lubed Reaper Switches,Side Printed PBT Keycaps,2.4GHz/USB-C/BT5.0 Mechanical Gaming Keyboards",
      img: "https://m.media-amazon.com/images/I/61MC8BK0w0L._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "1,391",
      price: "179,374",
      delivery: "TZS 140,426 delivery Wed, Apr 15"
    },
    {
      title: "Logitech G305 Lightspeed Wireless Gaming Mouse, Hero Sensor, 12,000 DPI, Lightweight, 6 Programmable Buttons, 250h Battery, On-Board Memory, Compatible with PC, Mac - Black",
      img: "https://m.media-amazon.com/images/I/51sg9BLSMTL._AC_UL800_.jpg",
      rating: 4.6,
      reviews: "37,830",
      price: "57,876",
      delivery: "Contact for shipping",
      isBestSeller: true
    },
    {
      title: "Lenovo Legion Pro 7i Gen 10 16\" Gaming Laptop (2025 Model) Intel Core Ultra 9 275HX 24C, NVIDIA GeForce RTX 5090 24GB, 64GB RAM, 2TB (1TB+1TB) NVMe SSD, 16\" WQXGA OLED 500 nits 240Hz, Windows 11 Home",
      img: "https://m.media-amazon.com/images/I/515W50hwJmL._AC_UL800_.jpg",
      rating: 4.9,
      reviews: "22",
      price: "9,097,400",
      delivery: "Contact for shipping"
    },
    {
      title: "TP-Link Dual-Band BE6500 WiFi 7 Gaming Router Archer GE400 | 6-Stream 6.5 Gbps | 2 x 2.5G + 3 x 1G | Game Acceleration, Dedicated Gaming Port & Panel, RGB Lighting | Easymesh, Homeshield | No 6 GHz",
      img: "https://m.media-amazon.com/images/I/61d731U4QVL._AC_UL800_.jpg",
      rating: 4.2,
      reviews: "35",
      price: "571,974",
      delivery: "TZS 166,270 delivery Wed, Apr 15"
    },
    {
      title: "HP OMEN MAX 45L Gaming Desktop PC (AMD Ryzen 9 9900X3D, GeForce RTX 5090 32GB GDDR7, 128GB DDR5, 8TB PCIe SSD, RGB Fans, 360mm AIO, 1200W PSU, WiFi 7, Win 11 Pro) w/DKZ USB Port Expander",
      img: "https://m.media-amazon.com/images/I/61gNFYtpFeL._AC_UL800_.jpg",
      rating: 4.5,
      reviews: "New",
      price: "20,903,974",
      delivery: "Contact for shipping"
    },
    {
      title: "ASUS ROG Swift 27\" OLED Gaming Monitor (PG27AQWP-W) - TrueBlack Glossy Tandem OLED, Dual-Mode (QHD@540Hz, HD@720Hz), 0.02ms, G-SYNC Compatible, Neo Proximity Sensor, DP 2.1, 3 yr Warranty",
      img: "https://m.media-amazon.com/images/I/815FPhAVEpL._AC_UL800_.jpg",
      rating: 4.0,
      reviews: "6",
      price: "2,857,400",
      delivery: "TZS 619,424 delivery Apr 16 - May 4"
    }
  ];
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-[#e3e6e6]">
      <Header onMenuOpen={() => setIsMenuOpen(true)} searchTerm="gaming" />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 pt-4 pb-0 flex gap-6">
        {/* Left Sidebar Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold mb-2">Popular Shopping Ideas</h3>
              <ul className="space-y-1 text-xs">
                <li className="hover:text-orange-600 cursor-pointer">Chair</li>
                <li className="hover:text-orange-600 cursor-pointer">Headset</li>
                <li className="hover:text-orange-600 cursor-pointer">Keyboard & Mouse</li>
                <li className="hover:text-orange-600 cursor-pointer">PC Speakers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Deals & Discounts</h3>
              <ul className="space-y-1 text-xs">
                <li className="hover:text-orange-600 cursor-pointer">All Discounts</li>
                <li className="hover:text-orange-600 cursor-pointer">Today's Deals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Customer Reviews</h3>
              <div className="flex items-center gap-1 text-xs hover:text-orange-600 cursor-pointer">
                <div className="flex text-orange-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                </div>
                <span>& Up</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Brands</h3>
              <ul className="space-y-1 text-xs">
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> Razer</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> ASUS</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> Logitech</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> msi</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> SteelSeries</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> Corsair</li>
                <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> acer</li>
              </ul>
              <span className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer mt-1 inline-block">See more</span>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Condition</h3>
              <ul className="space-y-1 text-xs">
                <li className="hover:text-orange-600 cursor-pointer">New</li>
                <li className="hover:text-orange-600 cursor-pointer">Renewed</li>
                <li className="hover:text-orange-600 cursor-pointer">Used</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid and Results */}
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 relative">
              {/* Mobile Filters Button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors"
                >
                  <Menu size={14} />
                  <span>Filters</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMobileFiltersOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60]"
                      />
                      <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-200 rounded-md mt-1 z-[70] p-4 max-h-[80vh] overflow-y-auto"
                      >
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                          <span className="font-bold text-sm">Filters</span>
                          <button onClick={() => setIsMobileFiltersOpen(false)}>
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-bold mb-2">Popular Shopping Ideas</h3>
                            <ul className="space-y-2 text-xs">
                              <li className="hover:text-orange-600 cursor-pointer">Chair</li>
                              <li className="hover:text-orange-600 cursor-pointer">Headset</li>
                              <li className="hover:text-orange-600 cursor-pointer">Keyboard & Mouse</li>
                              <li className="hover:text-orange-600 cursor-pointer">PC Speakers</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Deals & Discounts</h3>
                            <ul className="space-y-2 text-xs">
                              <li className="hover:text-orange-600 cursor-pointer">All Discounts</li>
                              <li className="hover:text-orange-600 cursor-pointer">Today's Deals</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Customer Reviews</h3>
                            <div className="flex items-center gap-1 text-xs hover:text-orange-600 cursor-pointer">
                              <div className="flex text-orange-400">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} />
                              </div>
                              <span>& Up</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Brands</h3>
                            <ul className="space-y-2 text-xs">
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> Razer</li>
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> ASUS</li>
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> Logitech</li>
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> msi</li>
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> SteelSeries</li>
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> Corsair</li>
                              <li className="flex items-center gap-2"><input type="checkbox" className="w-3 h-3" /> acer</li>
                            </ul>
                            <span className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer mt-1 inline-block">See more</span>
                          </div>

                          <div>
                            <h3 className="text-sm font-bold mb-2">Condition</h3>
                            <ul className="space-y-2 text-xs">
                              <li className="hover:text-orange-600 cursor-pointer">New</li>
                              <li className="hover:text-orange-600 cursor-pointer">Renewed</li>
                              <li className="hover:text-orange-600 cursor-pointer">Used</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 relative">
                <span className="text-xs text-gray-600">Sort by:</span>
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium hover:bg-gray-50 transition-colors min-w-[120px] justify-between"
                  >
                    <span>{sortBy}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsSortOpen(false)}
                          className="fixed inset-0 z-[60]"
                        />
                        <motion.div 
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="absolute top-full right-0 w-48 bg-white shadow-xl border border-gray-200 rounded-md mt-1 z-[70] overflow-hidden"
                        >
                          <ul className="py-1">
                            {["Featured", "Price: Low to High", "Price: High to Low", "Avg. Customer Review", "Newest Arrivals"].map((option) => (
                              <li 
                                key={option}
                                onClick={() => {
                                  setSortBy(option);
                                  setIsSortOpen(false);
                                }}
                                className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 transition-colors ${sortBy === option ? 'bg-gray-50 font-bold text-irshop-teal' : 'text-gray-700'}`}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
              {currentProducts.map((product, index) => (
                <GameProductCard 
                  key={indexOfFirstProduct + index} 
                  title={product.title}
                  img={product.img}
                  rating={product.rating}
                  reviews={product.reviews}
                  price={product.price}
                  delivery={product.delivery}
                  isBestSeller={product.isBestSeller}
                  isOverallPick={product.isOverallPick}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 my-4">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Simple logic to show 1, 2, 3 ... total
                if (pageNum <= 3 || pageNum === totalPages) {
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border border-gray-300 rounded-md text-xs ${currentPage === pageNum ? 'bg-gray-100 font-bold' : 'hover:bg-gray-100'}`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === 4) {
                  return <span key="ellipsis" className="text-xs">...</span>;
                }
                return null;
              })}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-xs hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
