import { useState } from "react";
import { Header, Sidebar as MainSidebar, MobileBottomNav } from "./components/Header";
import { Footer } from "./components/Footer";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import ProductGrid from "./components/dashboard/ProductGrid";
import DashboardPagination from "./components/dashboard/DashboardPagination";
import EmptyState from "./components/dashboard/EmptyState";
import AddProductModal from "./components/dashboard/AddProductModal";
import { useUserProducts } from "./UserProductsContext";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 12;

  const { userProducts } = useUserProducts();

  const [filters, setFilters] = useState({
    types: [] as string[],
    brands: [] as string[],
    priceMin: 0,
    priceMax: 10000000,
    colors: [] as string[],
    availability: "all"
  });

  const filteredProducts = userProducts.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (filters.types.length > 0 && !filters.types.some(type => product.tags.includes(type))) {
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
            onAddProduct={() => setIsAddModalOpen(true)}
          />

          <div className="flex-1 p-6">
            {userProducts.length === 0 ? (
              <EmptyState onAddProduct={() => setIsAddModalOpen(true)} />
            ) : (
              <>
                <ProductGrid products={currentProducts} />
                
                {totalPages > 1 && (
                  <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Floating Add Button (Mobile) */}
      {userProducts.length > 0 && (
        <motion.button
          type="button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAddModalOpen(true)}
          className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50"
        >
          <Plus size={24} />
        </motion.button>
      )}

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <Footer />
    </div>
  );
}
