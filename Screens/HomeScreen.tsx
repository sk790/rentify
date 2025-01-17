import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import HomeProductCard from "@/components/HomeProductCard";
import { BASE_URL } from "@env";
import { Product } from "@/types";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      const getAllProducts = async () => {
        const res = await fetch(`${BASE_URL}/api/product/products`);
        const data = await res.json();
        setLoading(false);
        // console.log(data);
        if (res.ok) {
          setLoading(false);
          setProducts(data.products);
        }
      };
      getAllProducts();
    } catch (error) {
      setLoading(false);
      alert(error);
    }
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
  const getProductDetails = (productId: string) => {
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
            {products.map((item, index) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => getProductDetails(item._id)}
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
