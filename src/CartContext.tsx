import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartContextType {
    cartCount: number;
    addToCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("irshop-cart");
        if (saved) {
            setCartCount(parseInt(saved, 10));
        }
    }, []);

    const addToCart = () => {
        setCartCount((prev) => {
            const newCount = prev + 1;
            localStorage.setItem("irshop-cart", newCount.toString());
            return newCount;
        });
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
