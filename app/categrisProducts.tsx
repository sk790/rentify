import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";

import HorizontalProductCard from "@/components/HorizontalProductCard";
import { BASE_URL } from "@env";
import { Product } from "@/types";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { useLocation } from "@/context/LocationContext";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import MyButton from "@/components/ui/MyButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function categrisProducts() {
  const { category } = useLocalSearchParams();
  const encodedCategory = encodeURIComponent(category as string);
  const { location } = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [range, setRange] = useState(5);
  const [lenght, setLenght] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const [filter, setfilter] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState({
    productLoading: false,
    showMoreLoading: false,
  });

  const stringLocation = JSON.stringify(location);
  const limit = 2;

  useEffect(() => {
    const getProductsByCategory = async () => {
      const res = await fetch(
        `${BASE_URL}/api/product/products?category=${encodedCategory.toLowerCase()}&limit=${limit}&areaRange=${range}&userCoords=${stringLocation}`
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setLenght(data.categoryProductLenght);
        setProducts(data.products);
      }
    };
    getProductsByCategory();
  }, [category, range]);

  const handleMore = async () => {
    const startIndex = products.length;
    console.log(startIndex, "startIndex");
    setLoadingStatus((prev) => ({ ...prev, showMoreLoading: true }));
    const res = await fetch(
      `${BASE_URL}/api/product/products?category=${encodedCategory.toLowerCase()}&limit=${limit}&areaRange=${range}&userCoords=${stringLocation}&startIndex=${startIndex}`
    );
    const data = await res.json();
    setLoadingStatus((prev) => ({ ...prev, showMoreLoading: false }));
    if (res.ok) {
      setProducts((prev: Product[]) => [...prev, ...data.products]);
      if (data.products.length < limit) setShowMore(false);
    }
  };
  const inset = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: Colors.tomato, light: Colors.tomato }}
      >
        {/* <View
        style={{
          marginTop: inset.top + 20,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginHorizontal: 10,
          }}
          >
        <TextInput
          placeholder="Set Range eg: 50km"
          style={{
            borderWidth: 1,
            flex: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
            height: 40,
            borderColor: Colors.tomato,
            }}
            onChangeText={(text) => setRange(parseInt(text))}
            />
            </View> */}
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          {lenght} Ads found for {category}
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              flex: 1,
            }}
          />
          <ThemedText type="defaultSemiBold">0 - {range || 5} km</ThemedText>
          <View style={{ borderWidth: StyleSheet.hairlineWidth, flex: 1 }} />
        </View>
        <HorizontalProductCard products={products} />
        {products?.length === 0 && (
          <ThemedText type="subtitle" style={{ textAlign: "center" }}>
            No products found
          </ThemedText>
        )}
        {showMore && (
          <ThemedButton
            title={"Show More"}
            loading={loadingStatus.showMoreLoading}
            onPress={handleMore}
          />
        )}
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
