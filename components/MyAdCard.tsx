import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@env";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

type Props = {
  product: Product;
  onDelete?: (productId: string) => void;
  onEdit?: (productId: Product) => void;
  onRemoveFavorite?: (productId: Product) => void;
  myAds?: boolean;
};
export default function MyAdCard({
  product,
  onDelete,
  onEdit,
  myAds,
  onRemoveFavorite,
}: Props) {
  const { user } = useAuth();
  const handleDelete = async (prductId: string) => {
    if (!product._id) return;
    try {
      const res = await fetch(`${BASE_URL}/api/product/${prductId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.msg);
        onDelete?.(prductId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFavorite = async (prductId: string) => {
    console.log(prductId);

    try {
      const res = await fetch(`${BASE_URL}/api/product/favorite/${prductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        onRemoveFavorite?.(product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/productDetail",
          params: { productId: product._id },
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image
            source={{
              uri: "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
            }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontWeight: "500" }}>{product.title}</Text>
              <Text>Rs {product.price}</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="eye-outline" size={16} color="#f50" />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 12,
                    color: Colors.gray,
                  }}
                >
                  25
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="heart" size={16} color="#f55" />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 12,
                    color: Colors.gray,
                  }}
                >
                  123
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: 10,
          }}
        >
          {myAds ? (
            <>
              <Ionicons
                name="pencil-sharp"
                size={20}
                color="black"
                onPress={() => onEdit?.(product)}
              />

              <TouchableOpacity onPress={() => handleDelete(product._id)}>
                <Ionicons name="trash-outline" size={26} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => handleRemoveFavorite(product._id)}>
              <Ionicons name="heart" size={25} color="#f458" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
