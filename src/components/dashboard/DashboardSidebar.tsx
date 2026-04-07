import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    types: string[];
    brands: string[];
    priceMin: number;
    priceMax: number;
    colors: string[];
    availability: string;
  };
  setFilters: (filters: any) => void;
}

export default function DashboardSidebar({ isOpen, onClose, filters, setFilters }: DashboardSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    brand: true,
    price: true,
    color: true,
    availability: true
  });

  const types = [
    { label: "Laptop", value: "laptop" },
    { label: "Desktop", value: "desktop" },
    { label: "Monitor", value: "monitor" },
    { label: "Accessories", value: "accessories" },
    { label: "Gaming", value: "gaming" }
  ];

  const brands = [
    { label: "ASUS", count: 45 },
    { label: "Lenovo", count: 32 },
    { label: "Samsung", count: 28 },
    { label: "Alienware", count: 15 },
    { label: "Razer", count: 12 },
    { label: "Logitech", count: 38 }
  ];

  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Red", hex: "#EF4444" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" }
  ];

  const toggleType = (type: string) => {
    setFilters({
      ...filters,
      types: filters.types.includes(type)
        ? filters.types.filter(t => t !== type)
        : [...filters.types, type]
    });
  };

  const toggleBrand = (brand: string) => {
    setFilters({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter(b => b !== brand)
        : [...filters.brands, brand]
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        className="fixed lg:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50 lg:z-0 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("type")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="text-sm font-semibold text-gray-900">Type</h3>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${expandedSections.type ? "" : "-rotate-90"}`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.type && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  {types.map(type => (
                    <label key={type.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type.value)}
                        onChange={() => toggleType(type.value)}
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">{type.label}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("brand")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="text-sm font-semibold text-gray-900">Brand</h3>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${expandedSections.brand ? "" : "-rotate-90"}`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.brand && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden max-h-48 overflow-y-auto"
                >
                  {brands.map(brand => (
                    <label key={brand.label} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand.label)}
                          onChange={() => toggleBrand(brand.label)}
                          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{brand.label}</span>
                      </div>
                      <span className="text-xs text-gray-400">{brand.count}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="text-sm font-semibold text-gray-900">Price Range</h3>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${expandedSections.price ? "" : "-rotate-90"}`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.price && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 mb-1 block">Min</label>
                      <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 mb-1 block">Max</label>
                      <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="10000000"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                    className="w-full accent-orange-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("color")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="text-sm font-semibold text-gray-900">Color</h3>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${expandedSections.color ? "" : "-rotate-90"}`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.color && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-wrap gap-2 overflow-hidden"
                >
                  {colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          colors: filters.colors.includes(color.name)
                            ? filters.colors.filter(c => c !== color.name)
                            : [...filters.colors, color.name]
                        });
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        filters.colors.includes(color.name) ? "border-orange-500 scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Availability Filter */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("availability")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="text-sm font-semibold text-gray-900">Availability</h3>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${expandedSections.availability ? "" : "-rotate-90"}`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.availability && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.availability === "all"}
                      onChange={() => setFilters({ ...filters, availability: "all" })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">All</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.availability === "in-stock"}
                      onChange={() => setFilters({ ...filters, availability: "in-stock" })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.availability === "out-of-stock"}
                      onChange={() => setFilters({ ...filters, availability: "out-of-stock" })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Out of Stock</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => setFilters({
              types: [],
              brands: [],
              priceMin: 0,
              priceMax: 10000000,
              colors: [],
              availability: "all"
            })}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </motion.aside>
    </>
  );
}
