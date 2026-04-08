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

export const UserProductsProvider = ({ children }: { children: ReactNode }) => {
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`userProducts_${user.email}`);
      if (stored) {
        setUserProducts(JSON.parse(stored));
      }
      setIsInitialized(true);
    } else {
      setUserProducts([]);
      setIsInitialized(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && isInitialized) {
      localStorage.setItem(`userProducts_${user.email}`, JSON.stringify(userProducts));
    }
  }, [userProducts, user, isInitialized]);

  const addProduct = (product: Omit<UserProduct, "id" | "userId" | "createdAt" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick">) => {
    if (!user) return;

    const newProduct: UserProduct = {
      ...product,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.email,
      rating: 0,
      reviews: "New",
      delivery: "TZS 50,000 delivery within 3-5 days",
      isBestSeller: false,
      isOverallPick: false,
      createdAt: new Date().toISOString()
    };

    setUserProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setUserProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProduct = (productId: string, updates: Partial<UserProduct>) => {
    setUserProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
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
