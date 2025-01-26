import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types";
import { BASE_URL } from "@env";

interface ProductContextType {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;

  favoriteProducts: Product[];
  setFavoriteProducts: (products: Product[]) => void;

  myAdsProducts: Product[];
  setMyAdsProducts: (products: Product[]) => void;

  myProductsOnRent: Product[];
  setMyProductsOnRent: (products: Product[]) => void;

  updateMyProductsOnRent: (
    product: Product,
    action: "toggle" | "delete" | "productUpdate"
  ) => void;
  updateMyAdsProducts: (
    product: Product,
    action: "add" | "delete" | "update" | "updateStatus"
  ) => void;
  updateFavoriteProducts: (
    product: Product,
    action: "toggle" | "productUpdate" | "delete"
  ) => void;
  updateAllProducts: (
    product: Product,
    action: "add" | "delete" | "update"
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

  const updateAllProducts = (
    product: Product,
    action: "add" | "delete" | "update"
  ) => {
    if (action === "add") {
      setAllProducts([...allProducts, product]);
    } else if (action === "delete") {
      setAllProducts(allProducts.filter((p) => p._id !== product._id));
    } else if (action === "update") {
      setAllProducts(
        allProducts.map((p) => (p._id === product._id ? product : p))
      );
    }
  };

  const updateFavoriteProducts = (
    product: Product,
    action: "toggle" | "productUpdate" | "delete"
  ) => {
    if (action === "toggle") {
      const isExist = favoriteProducts.some((fav) => fav._id === product._id);
      if (!isExist) {
        setFavoriteProducts([...favoriteProducts, product]);
      } else {
        setFavoriteProducts(
          favoriteProducts.filter((fav) => fav._id !== product._id)
        );
      }
    } else if (action === "productUpdate") {
      setFavoriteProducts(
        favoriteProducts.map((p) => (p._id === product._id ? product : p))
      );
    } else if (action === "delete") {
      setFavoriteProducts(
        favoriteProducts.filter((p) => p._id !== product._id)
      );
    }
  };
  const updateMyAdsProducts = (
    product: Product,
    action: "add" | "delete" | "update" | "updateStatus"
  ) => {
    if (action === "add") {
      setMyAdsState([...myAdsProducts, product]);
    } else if (action === "delete") {
      setMyAdsState(myAdsProducts.filter((p) => p._id !== product._id));
    } else if (action === "update") {
      setMyAdsState(
        myAdsProducts.map((p) => (p._id === product._id ? product : p))
      );
    } else if (action === "updateStatus") {
      setAllProducts(
        allProducts.map((p) => (p._id === product._id ? product : p))
      );
    }
  };
  const updateMyProductsOnRent = (
    product: Product,
    action: "toggle" | "delete" | "productUpdate"
  ) => {
    if (action === "toggle") {
      const isExist = myProductsOnRent.some((fav) => fav._id === product._id);
      if (!isExist) {
        setMyProductsOnRent([...myProductsOnRent, product]);
      } else {
        setMyProductsOnRent(
          myProductsOnRent.filter((fav) => fav._id !== product._id)
        );
      }
    } else if (action === "productUpdate") {
      setMyProductsOnRent(
        myProductsOnRent.map((p) => (p._id === product._id ? product : p))
      );
    } else if (action === "delete") {
      setMyProductsOnRent(
        myProductsOnRent.filter((p) => p._id !== product._id)
      );
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

        updateAllProducts,
        updateMyAdsProducts,
        updateFavoriteProducts,
        updateMyProductsOnRent,
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
