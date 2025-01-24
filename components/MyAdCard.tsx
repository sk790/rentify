import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@env";
import { router } from "expo-router";
import { useProducts } from "@/context/ProductContext";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import { ThemedView } from "@/defaultComponents/ThemedView";
import ThreeDotDrawer from "./ui/ThreeDots";
import UpdateProductModal from "./ui/UpdateProductModal";
import { useModal } from "@/context/ModalContext";
import { ThemedText } from "@/defaultComponents/ThemedText";

type Props = {
  product: Product;
  onDelete?: (productId: string) => void;
  onEdit?: (product: Product) => void;
  onRemoveFavorite?: (product: Product) => void;
  myAds?: boolean;
};

export default function MyAdCard({ product, onDelete, myAds }: Props) {
  const theme = useColorScheme();
  const bg = theme === "dark" ? Colors.black : Colors.white;
  const { updateFavorite, setProducts, setMyAds } = useProducts();
  const { openProductModal } = useModal();
  const [isAvailable, setIsAvailable] = useState(
    product.status === "Available" ? true : false
  );
  const handleDelete = async (productId: string) => {
    if (!product._id) return;
    try {
      const res = await fetch(`${BASE_URL}/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        updateFavorite(product);
        setProducts((prev: Product[]) =>
          prev.filter((p: Product) => p._id !== productId)
        );
        alert(data.msg);
        onDelete?.(productId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (productId: string) => {
    let status = product.status === "Available" ? "Rented" : "Available";
    try {
      const res = await fetch(
        `${BASE_URL}/api/product/status-update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );
      if (res.ok) {
        setIsAvailable(!isAvailable);
        setMyAds((prev: Product[]) =>
          prev.map((p: Product) => (p._id === productId ? { ...p, status } : p))
        );
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = () => {
    openProductModal();
  };

  const titles = [
    {
      title: "Edit",
      onPress: () => onEdit?.(),
      icon: "pencil",
      color: Colors.tomato,
    },
    {
      title: "Delete",
      onPress: () => handleDelete(product._id),
      icon: "trash",
      color: "red",
    },
  ];
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/productDetail",
          params: { productId: product._id },
        })
      }
    >
      <ThemedView
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          borderRadius: 10,
          padding: 10,
          borderColor: Colors.tomato,
          borderWidth: StyleSheet.hairlineWidth,
        }}
      >
        <ThemedView style={{ flexDirection: "row", gap: 10 }}>
          <ThemedView style={{ flexDirection: "row", gap: 10, flex: 1 }}>
            <Image
              source={{ uri: product.images[0] }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View>
                <ThemedText type="defaultSemiBold">{product.title}</ThemedText>
                <ThemedText>Rs {product.price}</ThemedText>
              </View>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="eye-outline" size={16} color="#f50" />
                  <ThemedText style={{ fontSize: 12 }}> 25</ThemedText>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="heart" size={16} color="#f55" />
                  <ThemedText style={{ fontSize: 12 }}> 123</ThemedText>
                </View>
              </View>
            </View>
          </ThemedView>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: 10,
            }}
          >
            {myAds ? (
              <ThreeDotDrawer titles={titles} />
            ) : (
              <>
                <TouchableOpacity onPress={() => updateFavorite(product)}>
                  <Ionicons name="heart" size={30} color={Colors.favorite} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </ThemedView>
        {myAds && (
          <ThemedView style={{ flexDirection: "row", gap: 10 }}>
            <ThemedButton
              title={isAvailable ? "Available" : "On Rent"}
              style={{ flex: 1 }}
              variant="outline"
              color={isAvailable ? "green" : "red"}
              onPress={() => updateStatus(product._id)}
            />
            <ThemedButton
              color={Colors.white}
              title="Sell faster"
              style={{ flex: 1 }}
              variant="default"
            />
          </ThemedView>
        )}
        {product && <UpdateProductModal product={product} />}
      </ThemedView>
    </TouchableOpacity>
  );
}
