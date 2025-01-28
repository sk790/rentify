import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types";
// import { BASE_URL } from "@env";

interface ProductContextType {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;

  favoriteProducts: Product[];
  setFavoriteProducts: (products: Product[]) => void;

  myAdsProducts: Product[];
  setMyAdsProducts: (products: Product[]) => void;

  myProductsOnRent: Product[];
  setMyProductsOnRent: (products: Product[]) => void;

  updateProduct: (
    product: Product,
    action: "update" | "delete" | "toggleRent" | "toggleFavorite" | "add"
  ) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [allProducts, setProductsState] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProductsState] = useState<Product[]>([]);
  const [myAdsProducts, setMyAdsState] = useState<Product[]>([]);
  const [myProductsOnRent, setMyRentState] = useState<Product[]>([]);

  const setMyProductsOnRent = (products: Product[]) => {
    setMyRentState(products);
  };
  const setAllProducts = (products: Product[]) => {
    setProductsState(products);
  };
  const setFavoriteProducts = (newFavoriteProducts: Product[]) => {
    setFavoriteProductsState(newFavoriteProducts);
  };
  const setMyAdsProducts = (newMyAds: Product[]) => {
    setMyAdsState(newMyAds);
  };
  const updateProduct = (
    product: Product,
    action: "update" | "delete" | "toggleFavorite" | "toggleRent" | "add"
  ) => {
    switch (action) {
      case "delete":
        setAllProducts(allProducts.filter((p) => p._id !== product._id));
        setFavoriteProducts(
          favoriteProducts.filter((p) => p._id !== product._id)
        );
        setMyRentState(myProductsOnRent.filter((p) => p._id !== product._id));
        setMyAdsProducts(myAdsProducts.filter((p) => p._id !== product._id));
        break;
      case "update":
        setAllProducts(
          allProducts.map((p) => (p._id === product._id ? product : p))
        );
        setFavoriteProducts(
          favoriteProducts.map((p) => (p._id === product._id ? product : p))
        );
        setMyAdsProducts(
          myAdsProducts.map((p) => (p._id === product._id ? product : p))
        );
        setMyProductsOnRent(
          myProductsOnRent.map((p) => (p._id === product._id ? product : p))
        );
        break;
      case "toggleFavorite":
        const isExist = favoriteProducts.some((fav) => fav._id === product._id);
        if (!isExist) {
          setFavoriteProducts([...favoriteProducts, product]);
        } else {
          setFavoriteProducts(
            favoriteProducts.filter((p) => p._id !== product._id)
          );
        }
        break;
      case "toggleRent":
        const isExistOnRent = myProductsOnRent.some(
          (fav) => fav._id === product._id
        );
        if (!isExistOnRent) {
          setMyProductsOnRent([...myProductsOnRent, product]);
        } else {
          setMyProductsOnRent(
            myProductsOnRent.filter((p) => p._id !== product._id)
          );
        }
        break;
    }
  };
  return (
    <ProductContext.Provider
      value={{
        allProducts,
        myAdsProducts,
        favoriteProducts,
        myProductsOnRent,

        setAllProducts,
        setMyAdsProducts,
        setFavoriteProducts,
        setMyProductsOnRent,
        updateProduct,
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
