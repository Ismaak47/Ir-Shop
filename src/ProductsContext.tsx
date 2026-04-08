import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import defaultProductsData from "./data/products.json";

const USER_PRODUCTS_STORAGE_KEY = "guest_inventory_storage";

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
    defaultProductsData.map((product) => ({
      ...product,
      isUserProduct: false,
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image]
    }));

  const getStoredUserProducts = (): Product[] => {
    const stored = localStorage.getItem(USER_PRODUCTS_STORAGE_KEY);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((product) => ({
        ...product,
        images: Array.isArray(product.images)
          ? product.images
          : product.image
            ? [product.image]
            : [],
        isUserProduct: true
      }));
    } catch (error) {
      console.error("Error loading user products:", error);
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
    const userProducts = getStoredUserProducts();
    setProducts(mergeProducts(userProducts));
  };

  const addProduct = (productData: Omit<Product, "id" | "rating" | "reviews" | "delivery" | "isBestSeller" | "isOverallPick" | "isUserProduct" | "userId" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: 0,
      reviews: "New",
      delivery: "TZS 50,000 delivery within 3-5 days",
      isBestSeller: false,
      isOverallPick: false,
      isUserProduct: true,
      userId: "guest",
      createdAt: new Date().toISOString(),
      images: Array.isArray(productData.images)
        ? productData.images.filter(Boolean)
        : productData.image
          ? [productData.image]
          : []
    };

    const existingUserProducts = getStoredUserProducts();
    const updatedUserProducts = [newProduct, ...existingUserProducts];

    localStorage.setItem(USER_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedUserProducts));
    setProducts(mergeProducts(updatedUserProducts));
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
    return products.filter((product) => product.isUserProduct);
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
