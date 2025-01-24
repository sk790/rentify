import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types";
import { BASE_URL } from "@env";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  favoriteProducts: Product[];
  setFavoriteProducts: (products: Product[]) => void;
  myAds: Product[];
  setMyAds: (products: Product[] | ((prev: Product[]) => Product[])) => void;
  updateFavorite: (product: Product) => Promise<void>;
  updateProductData: Product | undefined; // Current product being updated
  setUpdateProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProductsState] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProductsState] = useState<Product[]>([]);
  const [myAds, setMyAdsState] = useState<Product[]>([]);
  const [updateProductData, setUpdateProductDataState] = useState<
    Product | undefined
  >(undefined);

  const setProducts = (newProducts: Product[]) => {
    setProductsState(newProducts);
  };

  const setFavoriteProducts = (newFavoriteProducts: Product[]) => {
    setFavoriteProductsState(newFavoriteProducts);
  };

  const setMyAds = (newMyAds: Product[] | ((prev: Product[]) => Product[])) => {
    setMyAdsState((prev) =>
      typeof newMyAds === "function" ? newMyAds(prev) : newMyAds
    );
  };

  const setUpdateProduct = (product: Product) => {
    setUpdateProductDataState(product);
  };

  const updateFavorite = async (product: Product) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/product/favorite/${product._id}`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update favorite status");
      }

      const isAlreadyFavorite = favoriteProducts.some(
        (fav) => fav._id === product._id
      );

      if (isAlreadyFavorite) {
        // Remove from favorites
        setFavoriteProducts(
          favoriteProducts.filter((fav) => fav._id !== product._id)
        );
      } else {
        // Add to favorites
        setFavoriteProducts([...favoriteProducts, product]);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
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
        setUpdateProduct,
        updateProductData,
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
