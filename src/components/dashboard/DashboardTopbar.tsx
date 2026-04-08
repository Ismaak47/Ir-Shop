import { Search, SlidersHorizontal, Plus } from "lucide-react";

interface DashboardTopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onToggleSidebar: () => void;
  onAddProduct: () => void;
}

export default function DashboardTopbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onToggleSidebar,
  onAddProduct
}: DashboardTopbarProps) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "non-active", label: "Non Active" }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 lg:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button (Mobile) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={20} className="text-gray-600" />
          </button>

          {/* New Product Button */}
          <button
            type="button"
            onClick={onAddProduct}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>New Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
