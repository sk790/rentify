import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  favoriteProducts: any;
  setFavoriteProducts: (products: Product[]) => void;
  myAds: Product[];
  setMyAds: (products: Product[]) => void;
  updateFavorite: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProductsState] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProductsState] = useState<Product[]>([]);
  const [myAds, setMyAdsState] = useState<Product[]>([]);

  const setMyAds = (newMyAds: Product[] | ((prev: Product[]) => Product[])) => {
    setMyAdsState(newMyAds);
  };

  const setProducts = (newProducts: Product[]) => {
    setProductsState(newProducts);
  };

  const setFavoriteProducts = (newFavoriteProducts: Product[]) => {
    setFavoriteProductsState(newFavoriteProducts);
  };

  const updateFavorite = (product: Product) => {
    if (favoriteProducts.some((fav: Product) => fav._id === product._id)) {
      setFavoriteProducts(
        favoriteProducts.filter((fav: Product) => fav._id !== product._id)
      );
    } else {
      setFavoriteProducts([...favoriteProducts, { ...product }]);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        favoriteProducts,
        setFavoriteProducts,
        myAds,
        setMyAds,
        updateFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
