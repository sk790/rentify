import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Product } from "@/types";
import { useFormateDate } from "@/hooks/useFormateDate";
import { BASE_URL } from "@env";
import { useProducts } from "@/context/ProductContext";

export default function HomeProductCard({
  product,
  distance,
  isFavorite,
}: {
  product: Product;
  distance: number;
  isFavorite?: any;
}) {
  const { updateFavorite } = useProducts();
  const toggleFavorite = async (product: Product) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/product/favorite/${product._id}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      if (res.ok) {
        updateFavorite(product);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
        onPress={() => {
          toggleFavorite(product);
        }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? Colors.favorite : Colors.unFavorite}
          size={28}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: product.images[0],
          }}
          style={{ width: "100%", height: 150, borderRadius: 10 }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>
          ₹ {product.price}/{product.timePeriod}
        </Text>
        <Text>{product.productName}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text style={{ fontSize: 12, color: Colors.gray }}>
              {product.address}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: Colors.gray, fontWeight: "600" }}>
            {new Date(product.createdAt).toDateString() ===
            new Date().toDateString()
              ? "Today"
              : useFormateDate(product.createdAt)}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Text style={{ fontSize: 12, color: Colors.gray, fontWeight: "600" }}>
            {distance} km
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
