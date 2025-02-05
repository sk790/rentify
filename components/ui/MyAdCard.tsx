import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useProducts } from "@/context/ProductContext";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedView } from "@/components/ui/ThemedView";
import ThreeDotDrawer from "../ui/ThreeDots";
import { useModal } from "@/context/ModalContext";
import { ThemedText } from "@/components/ui/ThemedText";
import MyAlert from "../ui/MyAlert";
import { deleteProduct, toggleRent } from "@/actions";

type Props = {
  product: Product;
  onDelete?: (productId: string) => void;
  onEdit?: (product: Product) => void;
  onRemoveFavorite?: (product: Product) => void;
  myAds?: boolean;
};

export default function MyAdCard({ product, myAds }: Props) {
  const { myProductsOnRent, updateProduct } = useProducts();
  const { openAlertModal, closeAlertModal } = useModal();
  const [isAvailable, setIsAvailable] = useState(false);
  // useEffect(() => {
  //   myProductsOnRent.forEach((p) => {
  //     if (p._id === product._id) {
  //       setIsAvailable(true);
  //     }
  //   });
  // }, [updateProduct]);
  const handleDelete = async (product: Product) => {
    await deleteProduct(product._id);
    updateProduct(product, "delete");
    closeAlertModal();
  };
  const handleUpdateStatus = async (product: Product) => {
    await toggleRent(product._id);
    updateProduct(product, "toggleRent");
  };
  const onEdit = () => {
    router.push({
      pathname: "/updateProduct",
      params: { updateFormData: JSON.stringify(product) },
    });
  };

  const titles = [
    {
      title: "Edit",
      onPress: () => onEdit?.(),
      icon: "pencil",
      color: Colors.primary,
    },
    {
      title: "Delete",
      onPress: () => openAlertModal(),
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
        darkColor={Colors.dark.cardColor}
        lightColor={Colors.light.cardColor}
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          borderBottomColor: Colors.gray,
          padding: 10,
          gap: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
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
          </View>
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
                <TouchableOpacity
                  onPress={() => updateProduct(product, "toggleFavorite")}
                >
                  <Ionicons name="heart" size={30} color={Colors.favorite} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        {myAds && (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ThemedButton
              title={
                myProductsOnRent.some((p) => p._id === product._id)
                  ? "On Rent"
                  : "Available"
              }
              style={{ flex: 1 }}
              color={
                myProductsOnRent.some((p) => p._id === product._id)
                  ? "white"
                  : "green"
              }
              onPress={() => handleUpdateStatus(product)}
            />
            <ThemedButton
              color={Colors.white}
              title="Sell faster"
              style={{ flex: 1 }}
            />
          </View>
        )}
        <MyAlert
          message="Are you sure you want to delete this product ?"
          title="Delete"
          onCancel={closeAlertModal}
          onConfirm={() => handleDelete(product)}
        />
      </ThemedView>
    </TouchableOpacity>
  );
}
