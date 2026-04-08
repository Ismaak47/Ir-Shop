import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface UserProduct {
  id: string;
  userId: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  reviews: string;
  delivery: string;
  isBestSeller: boolean;
  isOverallPick: boolean;
  createdAt: string;
}

interface UserProductsContextType {
  userProducts: UserProduct[];
  addProduct: (product: Omit<UserProduct, "id" | "userId" | "createdAt" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick">) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (productId: string, updates: Partial<UserProduct>) => void;
}

const UserProductsContext = createContext<UserProductsContextType | undefined>(undefined);

const USER_PRODUCTS_STORAGE_KEY = "demo_inventory_storage";

export const UserProductsProvider = ({ children }: { children: ReactNode }) => {
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(USER_PRODUCTS_STORAGE_KEY);
    if (stored) {
      setUserProducts(JSON.parse(stored));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(userProducts));
    }
  }, [userProducts, isInitialized]);

  const addProduct = (product: Omit<UserProduct, "id" | "userId" | "createdAt" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick">) => {
    const newProduct: UserProduct = {
      ...product,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: "demo",
      rating: 0,
      reviews: "New",
      delivery: "TZS 50,000 delivery within 3-5 days",
      isBestSeller: false,
      isOverallPick: false,
      createdAt: new Date().toISOString()
    };

    setUserProducts(prev => {
      const updated = [newProduct, ...prev];
      localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProduct = (productId: string) => {
    setUserProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProduct = (productId: string, updates: Partial<UserProduct>) => {
    setUserProducts(prev => {
      const updated = prev.map(p => p.id === productId ? { ...p, ...updates } : p);
      localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserProductsContext.Provider value={{ userProducts, addProduct, deleteProduct, updateProduct }}>
      {children}
    </UserProductsContext.Provider>
  );
};

export const useUserProducts = () => {
  const context = useContext(UserProductsContext);
  if (!context) throw new Error("useUserProducts must be used within UserProductsProvider");
  return context;
};
