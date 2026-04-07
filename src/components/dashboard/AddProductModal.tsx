import { X, Upload, Plus } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useProducts } from "../../ProductsContext";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const { addProduct } = useProducts();
const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    tags: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [imagePreviews, setImagePreviews] = useState<string[]>(new Array(4).fill(""));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const categories = ["laptop", "desktop", "monitor", "accessories", "gaming", "keyboard", "mouse", "headset"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) newErrors.price = "Price must be a valid number";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!imagePreviews.some(p => p)) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const tags = formData.tags
      .split(",")
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);

    if (!tags.includes(formData.category)) {
      tags.unshift(formData.category);
    }

    const validPreviews = imagePreviews.filter(p => p);
    addProduct({
      name: formData.name,
      price: formData.price.replace(/,/g, ""),
      category: formData.category,
      description: formData.description,
      image: validPreviews[0] || "",
      images: validPreviews,
      tags
    });

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        tags: ""
      });
      setImagePreviews(new Array(4).fill(""));
      setErrors({});
      onClose();
    }
  };

  const handleImageSelect = (slotIndex: number) => {
    setActiveSlot(slotIndex);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeSlot !== null) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const base64 = ev.target?.result as string;
        setImagePreviews((prev) => {
          const updated = [...prev];
          updated[activeSlot] = base64;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (e.target) e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-green-800 font-medium">Product added successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
<form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., ASUS ROG Gaming Laptop"
className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (TZS) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 2500000"
className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your product features, specifications, etc."
className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Images */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Images <span className="text-red-500">*</span>
                </label>
                {errors.images && <p className="text-red-500 text-xs mb-3">{errors.images}</p>}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-[#D4AF37] hover:bg-gray-50 transition-all group bg-white"
                      onClick={() => handleImageSelect(index)}
                    >
                      {preview ? (
                        <>
                          <img
                            src={preview}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-1.5 right-1.5 bg-white/95 hover:bg-white rounded-full p-1.5 shadow-md border transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X size={14} className="text-gray-600 hover:text-red-500" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                          <Plus size={24} className="mb-1" />
                          <p className="text-xs font-medium">Add Image</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., gaming, rtx, intel, 16gb"
className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas for better search visibility</p>
              </div>
            </form>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm bg-[#D4AF37] hover:bg-[#B8932E] text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2 flex-1 sm:flex-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
