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
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { homeCategoryData } from "@/constants/Data";
import { ThemedText } from "@/defaultComponents/ThemedText";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const { products, setProducts, setMyAds, setFavoriteProducts } =
    useProducts();
  const [distances, setDistances] = useState<number[]>([]);
  const { location } = useLocation();
  const stringLocation = JSON.stringify(location);
  const { setUser } = useAuth();

  const getUser = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    const data = await res.json();
    console.log({ data });
    if (res.ok) {
      setFavoriteProducts(data.user.favorites);
      setMyAds(data.user.products);
      setUser(data.user);
    }
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/product/products?userCoords=${stringLocation}&areaRange=5`
      );
      const data = await res.json();
      setLoading(false);
      // console.log(data, "data");

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
    getUser();
  }, []);

  const getProductDetails = (productId: string) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  const getProductsByCategory = (category: string) => {
    router.push({ pathname: "/categrisProducts", params: { category } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{
          light: Colors.lightTomato,
          dark: Colors.lightTomato,
        }}
      >
        <Header />
        <View style={styles.categoryContainer}>
          {homeCategoryData?.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => getProductsByCategory(category.label)}
            >
              <CategoryCard image={category.image} label={category.label} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.productContainer}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 10 }}>
            Near by You
          </ThemedText>
          <View style={styles.productList}>
            {products?.map((item: Product, index) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => getProductDetails(item._id)}
                key={index}
              >
                <HomeProductCard product={item} distance={distances[index]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
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

  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  productCard: {
    width: "49%",
  },
});
