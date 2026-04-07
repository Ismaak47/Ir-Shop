import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import defaultProductsData from "./data/products.json";

const USER_PRODUCTS_STORAGE_KEY = "irshop:userProducts:v1";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  images: string[];
  rating: number;
  reviews: string;
  delivery: string;
  isBestSeller?: boolean;
  isOverallPick?: boolean;
  isUserProduct?: boolean;
  userId?: string;
  createdAt?: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick" | "isUserProduct" | "userId" | "createdAt">) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  searchProducts: (query: string) => Product[];
  getUserProducts: () => Product[];
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();

  const getDefaultProducts = (): Product[] =>
    defaultProductsData.map((product: any) => ({
      ...product,
      isUserProduct: false,
      images: product.images || (product.image ? [product.image] : []),
      category: product.category || "",
      description: product.description || "",
      tags: product.tags || [],
      price: product.price || "0",
      rating: product.rating || 0,
      reviews: product.reviews || "0",
      delivery: product.delivery || "TZS 50,000 delivery within 3-5 days"
    }));

  const getStoredUserProducts = (): Product[] => {
    const stored = localStorage.getItem(USER_PRODUCTS_STORAGE_KEY);
    if (!stored) {
      console.log("[ProductsContext] No stored user products found");
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        console.warn("[ProductsContext] Stored products is not an array");
        return [];
      }

      const processed = parsed.map((product) => ({
        ...product,
        images: Array.isArray(product.images)
          ? product.images
          : product.image
            ? [product.image]
            : [],
        isUserProduct: true
      }));
      
      console.log("[ProductsContext] Processed stored products:", processed.length);
      return processed;
    } catch (error) {
      console.error("[ProductsContext] Error loading user products:", error);
      return [];
    }
  };

  const mergeProducts = (userProducts: Product[]) => {
    const defaultProducts = getDefaultProducts();
    const allProducts = [...userProducts, ...defaultProducts];

    return allProducts.reduce((acc, product) => {
      if (!acc.find((existingProduct) => existingProduct.id === product.id)) {
        acc.push(product);
      }
      return acc;
    }, [] as Product[]);
  };

  // Initialize products on mount
  useEffect(() => {
    loadProducts();
  }, [user]);

  const loadProducts = () => {
    console.log("[ProductsContext] Loading products...");
    const userProducts = getStoredUserProducts();
    console.log("[ProductsContext] Loaded user products:", userProducts.length);
    const merged = mergeProducts(userProducts);
    console.log("[ProductsContext] Total products after merge:", merged.length);
    setProducts(merged);
  };

  const addProduct = (productData: Omit<Product, "id" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick" | "isUserProduct" | "userId" | "createdAt">) => {
    // Ensure images is always an array
    const imagesArray = Array.isArray(productData.images) 
      ? productData.images.filter(Boolean)
      : productData.image 
        ? [productData.image] 
        : [];

    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: 0,
      reviews: "New",
      delivery: "TZS 50,000 delivery within 3-5 days",
      isBestSeller: false,
      isOverallPick: false,
      isUserProduct: true,
      userId: user?.email || "anonymous",
      createdAt: new Date().toISOString(),
      image: imagesArray[0] || "", // Ensure image field is set
      images: imagesArray
    };

    console.log("[ProductsContext] Adding new product:", newProduct);

    const existingUserProducts = getStoredUserProducts();
    console.log("[ProductsContext] Existing user products:", existingUserProducts.length);
    
    const updatedUserProducts = [newProduct, ...existingUserProducts];

    localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedUserProducts));
    console.log("[ProductsContext] Saved to localStorage:", updatedUserProducts.length, "products");
    
    const merged = mergeProducts(updatedUserProducts);
    console.log("[ProductsContext] Merged products:", merged.length);
    
    setProducts(merged);
  };

  const deleteProduct = (productId: string) => {
    const updatedUserProducts = getStoredUserProducts().filter((product) => product.id !== productId);
    localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedUserProducts));
    setProducts(mergeProducts(updatedUserProducts));
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    const updatedUserProducts = getStoredUserProducts().map((product) =>
      product.id === productId
        ? {
            ...product,
            ...updates,
            images: Array.isArray(updates.images)
              ? updates.images
              : Array.isArray(product.images)
                ? product.images
                : product.image
                  ? [product.image]
                  : []
          }
        : product
    );

    localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedUserProducts));
    setProducts(mergeProducts(updatedUserProducts));
  };

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return products;

    const q = query.toLowerCase().trim();
    
    return products.filter(product => {
      const name = product.name.toLowerCase();
      const desc = product.description.toLowerCase();
      const category = product.category.toLowerCase();
      const tags = product.tags.map(t => t.toLowerCase());

      return (
        name.includes(q) ||
        desc.includes(q) ||
        category.includes(q) ||
        tags.some(tag => tag.includes(q))
      );
    });
  };

  const getUserProducts = (): Product[] => {
    if (!user) {
      return products.filter((product) => product.isUserProduct && product.userId === "anonymous");
    }
    return products.filter((product) => product.isUserProduct && product.userId === user.email);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      updateProduct,
      searchProducts,
      getUserProducts,
      getProductById
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within ProductsProvider");
  return context;
};
