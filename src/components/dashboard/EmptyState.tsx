import { Package, Plus } from "lucide-react";
import { motion } from "motion/react";

interface EmptyStateProps {
  onAddProduct: () => void;
}

export default function EmptyState({ onAddProduct }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[60vh] p-4 sm:p-8"
    >
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#C5A028]/5 rounded-2xl flex items-center justify-center">
            <Package size={28} className="text-[#D4AF37]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          No Products Yet
        </h2>
        
        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 max-w-[400px] mx-auto">
          Start building your store by adding your first product
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#C5A028] text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Your First Product</span>
        </button>
      </div>
    </motion.div>
  );
}
