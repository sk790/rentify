import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";

import HorizontalProductCard from "@/components/HorizontalProductCard";
import { Product } from "@/types";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { useLocation } from "@/context/LocationContext";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/defaultComponents/ThemedView";
import Header from "@/components/Header";
import EmptyPage from "@/components/ui/EmptyPage";
import ProductDetailPageHeader from "@/components/ProductDetailPageHeader";
import SearchBar from "@/components/ui/SearchBar";
import LoadingCard from "@/defaultComponents/LoadingCard";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function categrisProducts() {
  const { category } = useLocalSearchParams();
  const encodedCategory = encodeURIComponent(category as string);
  const { location } = useLocation();
  const [search, setSearch] = useState("");
  useEffect(() => {}, [search]);

  const [products, setProducts] = useState<Product[]>([]);
  const [range, setRange] = useState(5);
  const [lenght, setLenght] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const [distacnces, setDistances] = useState([]);

  const [loadingStatus, setLoadingStatus] = useState({
    productLoading: false,
    showMoreLoading: false,
  });

  const stringLocation = JSON.stringify(location);
  const limit = 20;

  useEffect(() => {
    const getProductsByCategory = async () => {
      setLoadingStatus((prev) => ({ ...prev, productLoading: true }));
      const res = await fetch(
        `${BASE_URL}/api/product/products?category=${
          search || encodedCategory.toLowerCase()
        }&limit=${limit}&areaRange=${range}&userCoords=${stringLocation}`
      );
      const data = await res.json();
      setLoadingStatus((prev) => ({ ...prev, productLoading: false }));
      if (res.ok) {
        if (data.products.length < limit) setShowMore(false);
        setLenght(data.categoryProductLenght);
        // console.log(data);
        setDistances(data.distances);
        setProducts(data.products);
      }
    };
    getProductsByCategory();
  }, [category, range, search]);

  const handleMore = async () => {
    const startIndex = products.length;
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

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: (category as string) || "Search" }}
      />
      <ThemedView style={{ paddingTop: 20, flex: 1 }}>
        <SearchBar placeholder={category as string} onChange={setSearch} />
        {products.length === 0 &&
          !loadingStatus.productLoading &&
          search !== "" && (
            <View
              style={{ flex: 1, justifyContent: "center", marginTop: "50%" }}
            >
              <EmptyPage msg="No products found Try changing your search or category" />
            </View>
          )}
        <ScrollView>
          <ThemedView>
            {!loadingStatus.productLoading && products.length > 0 && (
              <ThemedText
                type="defaultSemiBold"
                style={{ textAlign: "center", marginVertical: 20 }}
              >
                {products.length} product found for {category}
              </ThemedText>
            )}
            {loadingStatus.productLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <View
                    key={index}
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      gap: 5,
                      marginHorizontal: 10,
                    }}
                  >
                    <LoadingCard />
                  </View>
                ))
              : products?.map((product) => (
                  <HorizontalProductCard key={product._id} product={product} />
                ))}
          </ThemedView>
          {showMore && <ThemedButton title="Show more" onPress={handleMore} />}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({});
