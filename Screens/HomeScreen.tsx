import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import HomeProductCard from "@/components/HomeProductCard";
// import { BASE_URL } from "@env";
import { Location, Product, User } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { useLocation } from "@/context/LocationContext";
import { useAuth } from "@/context/AuthContext";
import ParallaxScrollView from "@/components/ui/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { homeCategoryData } from "@/constants/Data";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";

import { getUser } from "@/actions";
import LoadingCard from "@/components/ui/LoadingCard";
// import { useSocket } from "@/context/SocketContext";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function HomeScreen() {
  // const { onlineUsers } = useSocket();
  const [loading, setLoading] = useState(false);
  const {
    allProducts,
    setAllProducts,
    setFavoriteProducts,
    setMyAdsProducts,
    setMyProductsOnRent,
  } = useProducts();
  const [distances, setDistances] = useState<number[]>([]);
  const { location } = useLocation();
  const stringLocation = JSON.stringify(location);
  const { setUser, user } = useAuth();

  const getUserData = async () => {
    const res = await getUser();
    const data = await res?.json();
    if (res?.ok) {
      setFavoriteProducts(data.user.favorites);
      setMyAdsProducts(data.user.products);
      setUser(data.user, "setUser");
      setMyProductsOnRent(data.user.rented);
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
        setAllProducts(data.products);
        setDistances(data.distances);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getUserData();
  }, []);

  const getProductsByCategory = (category: string) => {
    router.push({ pathname: "/categrisProducts", params: { category } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: Colors.primary, dark: Colors.primary }}
      >
        <Header />
        <ThemedView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
            marginHorizontal: "auto",
          }}
        >
          {homeCategoryData?.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => getProductsByCategory(category.label)}
            >
              <CategoryCard image={category.image} label={category.label} />
            </TouchableOpacity>
          ))}
        </ThemedView>
        <ThemedView
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 10 }}>
            Near by You
          </ThemedText>
          <ThemedView
            style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}
          >
            {loading ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 5,
                      width: "49%",
                    }}
                  >
                    <LoadingCard />
                  </View>
                ))}
              </>
            ) : (
              allProducts?.map((item: Product, index) => (
                <HomeProductCard
                  key={index}
                  product={item}
                  distance={distances[index]}
                />
              ))
            )}
          </ThemedView>
        </ThemedView>
        {/* </ParallaxScrollView> */}
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

  productCard: {
    width: "49%",
  },
});
