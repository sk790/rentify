import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Product } from "@/types";
import { useFormateDate } from "@/hooks/useFormateDate";
import { useProducts } from "@/context/ProductContext";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { toggleFavorite } from "@/actions";
export default function HomeProductCard({
  product,
  distance,
}: {
  product: Product;
  distance: number;
}) {
  const { favoriteProducts, updateFavoriteProducts } = useProducts();

  const [like, setLike] = useState(false);
  useEffect(() => {
    setLike(favoriteProducts.some((fav) => fav._id === product._id));
  }, [favoriteProducts]);

  const handleFavorite = async (productId: string) => {
    await toggleFavorite(productId);
    updateFavoriteProducts(product, "toggle");
  };
  return (
    <ThemedView
      style={{
        width: "100%",
        borderRadius: 10,
        borderColor: Colors.tomato,
        borderWidth: 1,
        padding: 3,
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
      >
        <Ionicons
          onPress={() => handleFavorite(product._id)}
          name={like ? "heart-sharp" : "heart-outline"}
          color={like ? Colors.favorite : Colors.tomato}
          size={32}
        />
      </TouchableOpacity>
      <ThemedView style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: product.images[0],
          }}
          style={{ width: "100%", height: 150, borderRadius: 10 }}
        />
      </ThemedView>
      <ThemedView style={{ marginTop: 10 }}>
        <ThemedText>
          ₹ {product.price}/{product.timePeriod}
        </ThemedText>
        <ThemedText numberOfLines={2}>{product.productName}</ThemedText>
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              flex: 1,
            }}
          >
            <Ionicons name="location-outline" size={16} color={Colors.tomato} />
            <ThemedText
              numberOfLines={1}
              type="defaultSemiBold"
              style={{ fontSize: 11 }}
            >
              {product.address}
            </ThemedText>
          </ThemedView>
          <ThemedText type="defaultSemiBold" style={{ fontSize: 11 }}>
            {new Date(product.createdAt).toDateString() ===
            new Date().toDateString()
              ? "Today"
              : useFormateDate(product.createdAt)}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <ThemedText
            numberOfLines={1}
            type="defaultSemiBold"
            darkColor="gray"
            style={{
              fontSize: 12,
              flex: 1,
            }}
          >
            {distance} km
          </ThemedText>
          <Ionicons
            name={
              product?.status === "Available"
                ? "checkmark-circle"
                : "close-circle"
            }
            size={14}
            color={product?.status === "Available" ? "green" : "red"}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
