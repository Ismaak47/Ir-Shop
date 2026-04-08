import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import defaultProductsData from "./data/products.json";

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
}

interface ProductsContextType {
  products: Product[];
  searchProducts: (query: string) => Product[];
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getDefaultProducts = (): Product[] =>
    defaultProductsData.map((product) => ({
      ...product,
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image]
    }));

  useEffect(() => {
    setProducts(getDefaultProducts());
  }, []);

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

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      searchProducts,
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
