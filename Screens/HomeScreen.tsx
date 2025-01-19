import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import HomeProductCard from "@/components/HomeProductCard";
import { BASE_URL } from "@env";
import { Location, Product } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { useLocation } from "@/context/LocationContext";
import { useAuth } from "@/context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    products,
    setProducts,
    setMyAds,
    setFavoriteProducts,
    favoriteProducts,
  } = useProducts();
  const [distances, setDistances] = useState<number[]>([]);
  const { location } = useLocation();
  const stringLocation = JSON.stringify(location);
  const { setUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${BASE_URL}/api/auth/me`);
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setFavoriteProducts(data.user.favorites);
        setMyAds(data.user.products);
        setUser(data.user);
      }
    };
    getUser();
  }, []);
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/product/products?userCoords=${stringLocation}&areaRange=1000`
      );
      const data = await res.json();
      setLoading(false);
      console.log(data, "data");

      if (res.ok) {
        setLoading(false);
        // console.log(data.products, "data");

        setProducts(data.products);
        setDistances(data.distances);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const category = [
    "Vehicle",
    "Painter",
    "Furniture",
    "Clothing",
    "Accessories",
    "Jewellery",
    "Books",
    "Sports",
    "Music",
    "Fashion",
    "Beauty",
    "Gaming",
    "Gadgets",
  ];
  const image =
    "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg";
  const getProductDetails = (productId: string) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  const getProductsByCategory = (category: string) => {
    router.push({ pathname: "/categrisProducts", params: { category } });
  };

  //toggle favorite for real time in favoriteProduct hook not user.favorite
  const toggleFavorite = (product: Product) => {
    if (favoriteProducts.some((fav: Product) => fav._id === product._id)) {
      setFavoriteProducts(
        favoriteProducts.filter((fav: Product) => fav._id !== product._id)
      );
    } else {
      setFavoriteProducts([...favoriteProducts, { ...product }]);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView>
        <View style={styles.categoryContainer}>
          {category.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => getProductsByCategory(category)}
            >
              <CategoryCard image={image} label={category} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.productContainer}>
          <Text style={styles.sectionTitle}>Near by You</Text>
          <View style={styles.productList}>
            {products.map((item: Product, index) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => getProductDetails(item._id)}
                key={index}
              >
                <HomeProductCard
                  product={item}
                  distance={distances[index]}
                  isFavorite={favoriteProducts.some(
                    (fav: Product) => fav._id === item._id
                  )}
                  addToFavorite={toggleFavorite}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    paddingHorizontal: 10,
  },
  categoryCard: {
    width: "32%",
  },
  productContainer: {
    marginHorizontal: 10,
    backgroundColor: "white",
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    margin: 10,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  productCard: {
    width: "49%",
  },
});
