import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Product } from "@/types";
import { useFormateDate } from "@/hooks/useFormateDate";
import { useProducts } from "@/context/ProductContext";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { toggleFavorite } from "@/actions";
import { router } from "expo-router";
export default function HomeProductCard({
  product,
  distance,
}: {
  product: Product;
  distance: number;
}) {
  const { favoriteProducts, updateProduct, myProductsOnRent } = useProducts();

  const [like, setLike] = useState(false);
  useEffect(() => {
    setLike(favoriteProducts.some((fav) => fav._id === product._id));
  }, [favoriteProducts]);

  const handleFavorite = async (productId: string) => {
    await toggleFavorite(productId);
    updateProduct(product, "toggleFavorite");
  };
  return (
    <TouchableOpacity
      onPress={() => router.push(`/productDetail?productId=${product._id}`)}
      style={{ width: "49%" }}
    >
      <ThemedView
        darkColor={Colors.dark.cardColor}
        lightColor={Colors.light.cardColor}
        style={{
          borderRadius: 10,
          borderColor: Colors.gray,
          borderWidth: StyleSheet.hairlineWidth,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/productDetail?productId=${product._id}`)}
          style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
        >
          <Ionicons
            onPress={() => handleFavorite(product._id)}
            name={like ? "heart-sharp" : "heart-outline"}
            color={like ? Colors.favorite : Colors.primary}
            size={32}
          />
        </TouchableOpacity>
        <ThemedView style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: product.images[0],
            }}
            style={{ width: "100%", height: 150 }}
          />
        </ThemedView>
        <ThemedView style={{ paddingTop: 10, padding: 5 }}>
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
              <Ionicons
                name="location-outline"
                size={16}
                color={Colors.primary}
              />
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
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
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
                myProductsOnRent.some((p) => p._id === product._id)
                  ? "close-circle"
                  : "checkmark-circle"
              }
              size={14}
              color={
                myProductsOnRent.some((p) => p._id === product._id)
                  ? "red"
                  : "green"
              }
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
