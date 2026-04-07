import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import defaultProductsData from "./data/products.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
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
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();

  // Initialize products on mount
  useEffect(() => {
    loadProducts();
  }, [user]);

  // Save user products to localStorage whenever products change
  useEffect(() => {
    if (user) {
      const userProducts = products.filter(p => p.isUserProduct && p.userId === user.email);
      localStorage.setItem(`userProducts_${user.email}`, JSON.stringify(userProducts));
    }
  }, [products, user]);

  const loadProducts = () => {
    // Load default products
    const defaultProducts: Product[] = defaultProductsData.map(p => ({
      ...p,
      isUserProduct: false
    }));

    // Load user products if logged in
    let userProducts: Product[] = [];
    if (user) {
      const stored = localStorage.getItem(`userProducts_${user.email}`);
      if (stored) {
        try {
          userProducts = JSON.parse(stored);
        } catch (e) {
          console.error("Error loading user products:", e);
        }
      }
    }

    // Merge products (user products first, then default)
    const allProducts = [...userProducts, ...defaultProducts];
    
    // Remove duplicates by id
    const uniqueProducts = allProducts.reduce((acc, product) => {
      if (!acc.find(p => p.id === product.id)) {
        acc.push(product);
      }
      return acc;
    }, [] as Product[]);

    setProducts(uniqueProducts);
  };

  const addProduct = (productData: Omit<Product, "id" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick" | "isUserProduct" | "userId" | "createdAt">) => {
    if (!user) {
      console.error("User must be logged in to add products");
      return;
    }

    const newProduct: Product = {
      ...productData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      rating: 0,
      reviews: "New",
      delivery: "TZS 50,000 delivery within 3-5 days",
      isBestSeller: false,
      isOverallPick: false,
      isUserProduct: true,
      userId: user.email,
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, ...updates } : p
    ));
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
    if (!user) return [];
    return products.filter(p => p.isUserProduct && p.userId === user.email);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      updateProduct,
      searchProducts,
      getUserProducts
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
