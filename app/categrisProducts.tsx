import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import HorizontalProductCard from "@/components/HorizontalProductCard";
import { Product } from "@/types";
import { ThemedText } from "@/components/ui/ThemedText";
import { useLocation } from "@/context/LocationContext";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedView } from "@/components/ui/ThemedView";
import EmptyPage from "@/components/ui/EmptyPage";
import SearchBar from "@/components/ui/SearchBar";
import LoadingCard from "@/components/ui/LoadingCard";
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
      setLoadingStatus((prev) => ({ ...prev, productLoading: false }));
      if (res.ok) {
        const data = await res.json();
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
        {products.length === 0 && !loadingStatus.productLoading && (
          <EmptyPage msg="No products found Try changing your search or category" />
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
