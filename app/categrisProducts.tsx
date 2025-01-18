import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ProductDetailPageHeader from "@/components/ProductDetailPageHeader";
import Header from "@/components/Header";
import HorizontalProductCard from "@/components/HorizontalProductCard";
import { BASE_URL } from "@env";
import { Product } from "@/types";

export default function categrisProducts() {
  const { category } = useLocalSearchParams();
  const encodedCategory = encodeURIComponent(category as string);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProductsByCategory = async () => {
      const res = await fetch(
        `${BASE_URL}/api/product/products?category=${encodedCategory.toLowerCase()}&limit=20`
      );
      const data = await res.json();

      setProducts(data.products);
    };
    getProductsByCategory();
  }, [category]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Categris Products",
          header: () => <Header />,
        }}
      />
      <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 20 }}>
        {products?.length} Ads found for {category}
      </Text>
      <ScrollView>
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
          <Text style={{ fontWeight: "600" }}>0 - 5 km</Text>
          <View style={{ borderWidth: StyleSheet.hairlineWidth, flex: 1 }} />
        </View>
        <HorizontalProductCard products={products} />
        {products?.length === 0 && <Text>No products found</Text>}
        {products?.length === 20 && <Button title="Load more" />}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
