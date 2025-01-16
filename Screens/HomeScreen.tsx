import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, router, Stack } from "expo-router";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import HomeProductCard from "@/components/HomeProductCard";

export default function HomeScreen() {
  const data = [
    {
      id: 1,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    // More products...
  ];
  const category = [
    "Vehicle",
    "Electronics",
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
  const getProductDetails = (productId: number) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  const getProductsByCategory = (category: string) => {
    router.push({ pathname: "/categrisProducts", params: { category } });
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
              <CategoryCard item={category} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.productContainer}>
          <Text style={styles.sectionTitle}>Near by You</Text>
          <View style={styles.productList}>
            {data.map((item, index) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => getProductDetails(item.id)}
                key={index}
              >
                <HomeProductCard product={item} />
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
