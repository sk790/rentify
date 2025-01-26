import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useFormateDate } from "@/hooks/useFormateDate";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";

export default function HorizontalProductCard({ products }: any) {
  const getProductDetails = (productId: number) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  const { updateFavoriteProducts, favoriteProducts } = useProducts();
  return (
    <>
      {products?.map((product: any, index: number) => (
        <TouchableOpacity
          onPress={() => getProductDetails(product._id)}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
              borderRadius: 10,
              margin: 5,
              borderWidth: 1,
              borderColor: Colors.tomato,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 5,
              }}
            >
              <View>
                <Image
                  source={{
                    uri: product.images[0],
                  }}
                  style={{ width: 100, height: 100, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("@/assets/images/rupee-indian.png")}
                    style={{ width: 13, height: 13 }}
                  />
                  {product.price}/{product.timePeriod}
                </ThemedText>
                <ThemedText
                  type="default"
                  numberOfLines={2}
                  style={{ fontSize: 14, fontWeight: "500" }}
                >
                  {product.title}
                </ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="location-outline" size={20} color="black" />
                  <ThemedText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    type="default"
                    style={{ fontSize: 12, color: Colors.gray }}
                  >
                    {product.address}
                  </ThemedText>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Ionicons
                name={
                  favoriteProducts.some(
                    (fav: Product) => fav._id === product._id
                  )
                    ? "heart"
                    : "heart-outline"
                }
                size={28}
                color={Colors.favorite}
                onPress={() => updateFavoriteProducts(product, "toggle")}
              />
              <Text style={{ fontSize: 12, fontWeight: "600" }}>
                {useFormateDate(product.createdAt)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({});
