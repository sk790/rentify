import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Product, User } from "@/types";
import { BASE_URL } from "@env";
import { Colors } from "@/constants/Colors";
import MyAdCard from "@/components/MyAdCard";

export default function MyAds({ navigation }: { navigation: any }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };
  const handleEdit = (product: Product) => {
    navigation.navigate("Create", { product });
  };
  const goToListing = () => {
    navigation.navigate("Create");
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/auth/me`);
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setLoading(false);
        setProducts(data.user.products);
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to retrieve token:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ marginVertical: 10 }}>
      {products?.length > 0 &&
        products.map((products) => (
          <TouchableOpacity
            key={products._id}
            onPress={() =>
              router.push({
                pathname: "/productDetail",
                params: { productId: products._id },
              })
            }
            style={{ margin: 5 }}
          >
            <MyAdCard
              key={products._id}
              product={products}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </TouchableOpacity>
        ))}
      {products?.length === 0 && (
        <View
          style={{
            height: "100%",
            backgroundColor: Colors.white,
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            No Product Found
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light,
              padding: 10,
              borderRadius: 10,
              width: "50%",
              alignSelf: "center",
            }}
            onPress={goToListing}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Add Product
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
