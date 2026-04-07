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
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="text-center max-w-md px-6">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
            <Package size={48} className="text-orange-500" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          No Products Yet
        </h2>
        <p className="text-gray-600 mb-8">
          You haven't added any products to your store. Start by adding your first product to get started.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus size={20} />
          <span>Add Your First Product</span>
        </button>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            💡 Tip: Add detailed descriptions and high-quality images to attract more customers
          </p>
        </div>
      </div>
    </motion.div>
  );
}
