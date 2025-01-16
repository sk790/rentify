import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function HorizontalProductCard({ products }: any) {
  const getProductDetails = (productId: number) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  return (
    <>
      {products?.map((product: any, index: number) => (
        <TouchableOpacity
          onPress={() => getProductDetails(product.id)}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: Colors.white,
              padding: 10,
              borderRadius: 10,
              margin: 10,
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
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: 150,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  ₹ 3999/{product.period}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 14, fontWeight: "500" }}
                >
                  {product.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="location-outline" size={20} color="black" />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: Colors.gray,
                    }}
                  >
                    {product.address}
                  </Text>
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
              <Ionicons name="heart-outline" size={28} color="black" />
              <Text>{product.uploadAt} day</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({});
