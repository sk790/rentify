import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Product } from "@/types";

interface ProductContextType {
  products: Product[]; // The list of products
  setProducts: (products: Product[]) => void; // Updates the product list
}

// Initialize the context with undefined, as it will be provided by the provider
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProductsState] = useState<Product[]>([]);

  const setProducts = (newProducts: Product[]) => {
    setProductsState(newProducts);
  };

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
