import { useState } from "react";
import { Header, Sidebar as MainSidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import ProductGrid from "./components/dashboard/ProductGrid";
import DashboardPagination from "./components/dashboard/DashboardPagination";
import productsData from "./data/products.json";
import { Product } from "./utils/searchUtils";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({
    types: [] as string[],
    brands: [] as string[],
    priceMin: 0,
    priceMax: 10000000,
    colors: [] as string[],
    availability: "all"
  });

  const allProducts = productsData as Product[];

  const filteredProducts = allProducts.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (filters.types.length > 0 && !filters.types.some(type => product.tags.includes(type))) {
      return false;
    }

    if (filters.brands.length > 0 && !filters.brands.some(brand => 
      product.name.toLowerCase().includes(brand.toLowerCase())
    )) {
      return false;
    }

    const price = parseFloat(product.price);
    if (price < filters.priceMin || price > filters.priceMax) {
      return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MainSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileBottomNav onMenuOpen={() => setIsMenuOpen(true)} />

      <main className="flex-1 flex">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="flex-1 flex flex-col">
          <DashboardTopbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 p-6">
            <ProductGrid products={currentProducts} />
            
            <DashboardPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
