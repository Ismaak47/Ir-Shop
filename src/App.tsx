import { Search, ShoppingCart, MapPin, Menu, Facebook, Instagram, Music2 as Tiktok, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

// Reusable Components
const QuadCard = ({ title, items, linkText, linkHref = "#" }: { title: string, items: { img: string, label: string }[], linkText: string, linkHref?: string }) => (
  <div className="bg-white p-5 flex flex-col h-full shadow-sm">
    <h2 className="text-xl font-bold mb-3 line-clamp-2 h-14">{title}</h2>
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 flex-1 mb-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1 cursor-pointer group">
          <div className="overflow-hidden aspect-square">
            <img 
              src={item.img} 
              alt={item.label} 
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span className="text-xs text-gray-700 line-clamp-1">{item.label}</span>
        </div>
      ))}
    </div>
    <a href={linkHref} className="text-blue-600 hover:text-orange-600 hover:underline text-sm font-medium mt-auto">{linkText}</a>
  </div>
);

const SingleCard = ({ title, img, linkText, linkHref = "#" }: { title: string, img: string, linkText: string, linkHref?: string }) => (
  <div className="bg-white p-5 flex flex-col h-full shadow-sm">
    <h2 className="text-xl font-bold mb-3 line-clamp-2 h-14">{title}</h2>
    <div className="flex-1 overflow-hidden mb-4 cursor-pointer group">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
        referrerPolicy="no-referrer" 
      />
    </div>
    <a href={linkHref} className="text-blue-600 hover:text-orange-600 hover:underline text-sm font-medium mt-auto">{linkText}</a>
  </div>
);

const Shoveler = ({ title, items }: { title: string, items: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white p-5 my-2 shadow-sm relative group max-w-[1500px] mx-auto">
      <div className="flex items-baseline gap-4 mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline text-sm font-medium">Shop now</a>
      </div>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
        >
          {items.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[200px] aspect-[3/4] cursor-pointer hover:opacity-90 transition-opacity">
              <img src={img} alt={`Product ${i}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col text-sm font-sans bg-[#e3e6e6]">
      {/* Header */}
      <header className="bg-irshop-teal text-white sticky top-0 z-50 shadow-md">
        {/* Top Belt */}
        <div className="max-w-[1500px] mx-auto flex items-center gap-4 p-2">
          {/* Logo */}
          <div className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
            <img 
              src="https://storage.googleapis.com/static.antigravity.ai/user_uploads/76e88bfc-c779-40a9-9237-c8521f5e1209/76e88bfc-c779-40a9-9237-c8521f5e1209.png" 
              alt="Ir-Shop Logo" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer gap-1 transition-colors">
            <MapPin size={18} className="mt-2" />
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-300 leading-none">Deliver to</span>
              <span className="font-bold leading-none">Tanzania</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-irshop-accent transition-shadow">
            <div className="hidden sm:flex items-center px-3 bg-gray-100 text-gray-600 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-xs text-nowrap">
              All
            </div>
            <input
              type="text"
              placeholder="Search Ir-Shop"
              className="flex-1 px-3 py-2 text-black outline-none bg-white min-w-0"
            />
            <button className="bg-irshop-accent hover:bg-irshop-accent-hover px-4 flex items-center justify-center text-black transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-1">
            <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-300 leading-none">Hello, sign in</span>
                <span className="font-bold leading-none flex items-center whitespace-nowrap">Account & Lists</span>
              </div>
            </div>

            <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex items-center gap-1 transition-colors">
              <div className="relative">
                <ShoppingCart size={32} />
                <span className="absolute -top-1 -right-1 bg-irshop-teal text-irshop-accent rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs border-2 border-irshop-teal">0</span>
              </div>
              <span className="font-bold mt-3 hidden md:inline">Cart</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="bg-irshop-teal-light">
          <div className="max-w-[1500px] mx-auto flex items-center px-2 py-1 gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer font-bold whitespace-nowrap transition-colors">
              <Menu size={20} />
              All
            </div>
            <ul className="flex items-center gap-4 text-sm font-medium whitespace-nowrap">
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Today's Deals</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Gift Cards</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Sell</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Registry</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Prime Video</li>
              <li className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">Customer Service</li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative max-w-[1500px] mx-auto">
          <div className="w-full h-[300px] md:h-[600px] overflow-hidden relative">
            <img
              src="https://m.media-amazon.com/images/I/51XbQM8KUnL._SX1500_.jpg"
              alt="Shop Mother's Day gifts"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#e3e6e6]"></div>
          </div>

          {/* Cards Grid Overlapping Hero */}
          <div className="px-4 -mt-20 md:-mt-80 relative z-10 max-w-[1500px] mx-auto">
            {/* Row 1: Grids 1-4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <SingleCard 
                title="Get your game on" 
                img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_1x_EN._SY304_CB564799420_.jpg" 
                linkText="Shop gaming" 
              />
              <QuadCard 
                title="New home arrivals under $50" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_315_HP_NewArrivals_QuadCard_D_01_1x._SY116_CB555960040_.jpg", label: "Kitchen & Dining" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_316_HP_NewArrivals_QuadCard_D_02_1x._SY116_CB555960040_.jpg", label: "Home Improvement" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_317_HP_NewArrivals_QuadCard_D_03_1x._SY116_CB555960040_.jpg", label: "Décor" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_318_HP_NewArrivals_QuadCard_D_04_1x._SY116_CB555960040_.jpg", label: "Bedding & Bath" },
                ]} 
                linkText="Shop the latest from Home" 
              />
              <QuadCard 
                title="Easy updates for elevated spaces" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_LaundryLuxe_D_Quad_186x116._SY116_CB594237035_.jpg", label: "Baskets & hampers" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_Kitchen_D_Quad_186x116._SY116_CB594237035_.jpg", label: "Hardware" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_AccentFurniture_D_Quad_186x116._SY116_CB594237035_.jpg", label: "Accent furniture" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_Hallway_D_Quad_186x116._SY116_CB594237035_.jpg", label: "Wallpaper & paint" },
                ]} 
                linkText="Shop home products" 
              />
              <QuadCard 
                title="Find gifts for Mom" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/melody/uploads/df3cb7be-6ce1-47db-8526-7b703e0981bc_MuseDesktop372X232_1X/AIS_MDay26_QC_Exports_MDay26_09_Muse_Prod_melody_homepage_372x232_1X._SY116_CB784418306_.jpg", label: "Apparel" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/melody/uploads/8de64d94-c889-405e-b822-129dedae2732_MuseDesktop372X232_1X/AIS_MDay26_QC_Exports_MDay26_03_Muse_Prod_melody_homepage_372x232_1X._SY116_CB784418335_.jpg", label: "Shoes" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/melody/uploads/374dfcfa-1630-4d89-ad31-7f7cabdee889_MuseDesktop372X232_1X/AIS_MDay26_QC_Exports_MDay26_05_Muse_Prod_melody_homepage_372x232_1X._SY116_CB784418326_.jpg", label: "Jewelry" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/melody/uploads/a251f729-bbcd-402f-8576-dcbb89a22978_MuseDesktop372X232_1X/AIS_MDay26_QC_Exports_MDay26_07_Muse_Prod_melody_homepage_372x232_1X._SY116_CB784418325_.jpg", label: "Handbags" },
                ]} 
                linkText="Shop Mother's Day gifts" 
              />
            </div>

            {/* Shoveler 1: Best Sellers in Clothing */}
            <Shoveler 
              title="Best Sellers in Clothing, Shoes & Jewelry" 
              items={[
                "https://m.media-amazon.com/images/I/81GbVZK+4yL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61C-skMeafL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/81TR8F0H-FL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71IFE6W6THL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71hiGloiqJL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/51rkKPruYvL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/613+lFVMnEL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61xO2Bu9oJL._AC_SY200_.jpg",
              ]} 
            />

            {/* Shoveler 2: International top sellers in Kitchen */}
            <Shoveler 
              title="International top sellers in Kitchen" 
              items={[
                "https://m.media-amazon.com/images/I/411VuaxGFsL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/715a83Wv22L._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71EvhT3odHL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71wUZfLtoPL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/719XNYJEcZL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61-5sfLKOgL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61+6E0F49gL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/41lEE-pCRgL._AC_SY200_.jpg",
              ]} 
            />

            {/* Row 2: BTF Grids 1-4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              <QuadCard 
                title="Have more fun with family" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Playground_sets._SY116_CB558654384_.jpg", label: "Outdoor Play Sets" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_STEM_toys_or_learning_toys._SY116_CB558654384_.jpg", label: "Learning Toys" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Action_figure._SY116_CB558654384_.jpg", label: "Action Figures" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Pretend_Play_Toys._SY116_CB558654384_.jpg", label: "Pretend Play Toys" },
                ]} 
                linkText="See more" 
              />
              <QuadCard 
                title="Gear up to get fit" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Clothing._SY116_CB549022351_.jpg", label: "Clothing" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Trackers._SY116_CB549022351_.jpg", label: "Trackers" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Equipment._SY116_CB549022351_.jpg", label: "Equipment" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Deals_Fitness._SY116_CB549022351_.jpg", label: "Deals" },
                ]} 
                linkText="Discover more" 
              />
              <QuadCard 
                title="Most-loved travel essentials" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Backpack_1x._SY116_CB566100767_.jpg", label: "Backpacks" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/TravelBag_1x._SY116_CB566100767_.jpg", label: "Suitcases" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Accessories_1x._SY116_CB566100767_.jpg", label: "Accessories" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Handbags_1x._SY116_CB566100767_.jpg", label: "Handbags" },
                ]} 
                linkText="Discover more" 
              />
              <QuadCard 
                title="Level up your gaming" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/CE/GamingWeek24/Homepage/DQC/CE24_SUM_GW_DQC_NW_GamingWeek_PC_v2_1x._SY116_CB558844445_.jpg", label: "PC gaming" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/CE/GamingWeek24/Homepage/DQC/CE24_SUM_GW_DQC_NE_GamingWeek_Xbox_v2_1x._SY116_CB558844445_.jpg", label: "Xbox" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/CE/GamingWeek24/Homepage/DQC/CE24_SUM_GW_DQC_SW_GamingWeek_Sony_v2_1x._SY116_CB558844445_.jpg", label: "PlayStation" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/CE/GamingWeek24/Homepage/DQC/CE24_SUM_GW_DQC_SE_GamingWeek_Nintendo_v2_1x._SY116_CB558844445_.jpg", label: "Nintendo Switch" },
                ]} 
                linkText="Shop the latest in gaming" 
              />
            </div>

            {/* Shoveler 3: Top picks for Tanzania */}
            <Shoveler 
              title="Top picks for Tanzania, United Republic of" 
              items={[
                "https://m.media-amazon.com/images/I/51lP01--ejL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61TcjJ4qDZL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/714VRmqcVmL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61qCeGkiTXL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/817WrflosJL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/81Lg7Hp2Y0L._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/81i5KcFKysL._AC_SY200_.jpg",
              ]} 
            />

            {/* Shoveler 4: Best Sellers in Computers */}
            <Shoveler 
              title="Best Sellers in Computers & Accessories" 
              items={[
                "https://m.media-amazon.com/images/I/71nVIiWEcgL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71K30PIVQmL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/51IFiSD+kCL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71iZhpB2FpL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71CRaMOcDvL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71K00r5z4iL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/81Q9vMNUOyL._AC_SY200_.jpg",
              ]} 
            />

            {/* Row 3: BTF Grids 5-8 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              <QuadCard 
                title="Level up your beauty routine" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Make-up._SY116_CB558654384_.jpg", label: "Makeup" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Brushes._SY116_CB558654384_.jpg", label: "Brushes" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Sponges._SY116_CB558654384_.jpg", label: "Sponges" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Mirrors._SY116_CB558654384_.jpg", label: "Mirrors" },
                ]} 
                linkText="See more" 
              />
              <QuadCard 
                title="Level up your PC here" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Laptop._SY116_CB549022351_.jpg", label: "Laptops" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_PC._SY116_CB549022351_.jpg", label: "PCs" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Hard_Drives._SY116_CB549022351_.jpg", label: "Hard Drives" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Monitors._SY116_CB549022351_.jpg", label: "Monitors" },
                ]} 
                linkText="Discover more" 
              />
              <QuadCard 
                title="Most-loved watches" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/WomenWatches_1x._SY116_CB564394432_.jpg", label: "Women" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/MenWatches_1x._SY116_CB564394432_.jpg", label: "Men" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/GirlWatches_1x._SY116_CB564394432_.jpg", label: "Girls" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/BoyWatches_1x._SY116_CB564394432_.jpg", label: "Boys" },
                ]} 
                linkText="Discover more" 
              />
              <QuadCard 
                title="Gaming merchandise" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Apparel_1x._SY116_CB667159060_.jpg", label: "Apparel" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Hat_1x._SY116_CB667159060_.jpg", label: "Hats" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Figure_1x._SY116_CB667159060_.jpg", label: "Action figures" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mug_1x._SY116_CB667159063_.jpg", label: "Mugs" },
                ]} 
                linkText="See more" 
              />
            </div>

            {/* Shoveler 5: Best Sellers in Kitchen */}
            <Shoveler 
              title="Best Sellers in Kitchen & Dining" 
              items={[
                "https://m.media-amazon.com/images/I/81Ubo+JAyxL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/61sS-XIvEXL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/81GimKZfzDL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71v-pTar1AL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71Y4-ItMNBL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/718Tr1uB1OL._AC_SY200_.jpg",
                "https://m.media-amazon.com/images/I/71cHyyOt7YL._AC_SY200_.jpg",
              ]} 
            />

            {/* Row 4: BTF Grid 9 + Shoveler 6 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
              <div className="lg:col-span-1">
                <QuadCard 
                  title="Get ready for Easter" 
                  items={[
                    { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2026/Easter_26/AIS_Easter_Muse_QuadCards_2026_Exports_Easter26_05_Muse_Prod_melody_homepage_372x232_1X._SY116_CB786813666_.jpg", label: "Easter bunny" },
                    { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2026/Easter_26/AIS_Easter_Muse_QuadCards_2026_Exports_Easter26_07_Muse_Prod_melody_homepage_372x232_1X._SY116_CB786813666_.jpg", label: "Easter baskets" },
                    { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2026/Easter_26/AIS_Easter_Muse_QuadCards_2026_Exports_Easter26_15_Muse_Prod_melody_homepage_372x232_1X._SY116_CB786813666_.jpg", label: "Easter decor" },
                    { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2026/Easter_26/AIS_Easter_Muse_QuadCards_2026_Exports_Easter26_13_Muse_Prod_melody_homepage_372x232_1X._SY116_CB786813666_.jpg", label: "Easter baking" },
                  ]} 
                  linkText="Shop for Easter" 
                />
              </div>
              <div className="lg:col-span-3">
                <Shoveler 
                  title="Best Sellers in Beauty & Personal Care" 
                  items={[
                    "https://m.media-amazon.com/images/I/51ubxqzNGIL._AC_SY200_.jpg",
                    "https://m.media-amazon.com/images/I/61t087PwecL._AC_SY200_.jpg",
                    "https://m.media-amazon.com/images/I/71eFYqXRGoL._AC_SY200_.jpg",
                    "https://m.media-amazon.com/images/I/61occWCJN-L._AC_SY200_.jpg",
                    "https://m.media-amazon.com/images/I/71MQo8pHmBL._AC_SY200_.jpg",
                    "https://m.media-amazon.com/images/I/61V2Tp2pJKL._AC_SY200_.jpg",
                    "https://m.media-amazon.com/images/I/61aDluwKSxL._AC_SY200_.jpg",
                  ]} 
                />
              </div>
            </div>

            {/* Row 5: BTF Grids 10-12 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              <QuadCard 
                title="Finds for Home" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Kitchen._SY116_CB558654384_.jpg", label: "Kitchen" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Home_decor._SY116_CB558654384_.jpg", label: "Home Decor" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Dining._SY116_CB558654384_.jpg", label: "Dining" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Smart_home._SY116_CB558654384_.jpg", label: "Smart Home" },
                ]} 
                linkText="See more" 
              />
              <QuadCard 
                title="Score the top PCs & Accessories" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Desktops._SY116_CB558654384_.jpg", label: "Desktops" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_laptop._SY116_CB558654384_.jpg", label: "Laptops" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Hard_Drives._SY116_CB558654384_.jpg", label: "Hard Drives" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Accessories._SY116_CB558654384_.jpg", label: "PC Accessories" },
                ]} 
                linkText="See more" 
              />
              <QuadCard 
                title="Explore more in Sports" 
                items={[
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Cycling_1X._SY116_CB563192628_.jpg", label: "Cycling" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Running_1X._SY116_CB563192628_.jpg", label: "Running" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/ExerciseAndFitness_1X._SY116_CB563192628_.jpg", label: "Exercise & Fitness" },
                  { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Golf_1X._SY116_CB563192628_.jpg", label: "Golf" },
                ]} 
                linkText="Explore more" 
              />
            </div>

            {/* Shoveler 7: Best Sellers in Books */}
            <div className="mt-2">
              <Shoveler 
                title="Best Sellers in Books" 
                items={[
                  "https://m.media-amazon.com/images/I/71LtTkRdVzL._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/71PjIDe6FLL._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/81RY2q1HcGL._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/91ENQs2KLAL._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/71ihGxMQEBL._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/81mIz5vLAfL._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/81uv7QtqJ0L._AC_SY200_.jpg",
                  "https://m.media-amazon.com/images/I/41XZlhQ+5NL._AC_SY200_.jpg",
                ]} 
              />
            </div>
          </div>
        </div>
      </main>

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
    </div>
  );
}
