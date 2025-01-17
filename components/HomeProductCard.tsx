import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Product } from "@/types";

export default function HomeProductCard({ product }: { product: Product }) {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
      }}
    >
      <Ionicons
        name="heart-outline"
        size={28}
        style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: product.images[0],
          }}
          style={{ width: "80%", height: 125, borderRadius: 10 }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          ₹ {product.price}/{product.timePeriod}
        </Text>
        <Text>{product.productName}</Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={{ fontSize: 12, color: Colors.gray }}>
            {product.address}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
