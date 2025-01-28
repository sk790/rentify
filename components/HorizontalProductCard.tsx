import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useFormateDate } from "@/hooks/useFormateDate";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { ThemedView } from "@/defaultComponents/ThemedView";

export default function HorizontalProductCard({
  product,
}: {
  product: Product;
}) {
  const getProductDetails = (productId: string) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  const { updateProduct, favoriteProducts } = useProducts();

  return (
    <>
      <TouchableOpacity onPress={() => getProductDetails(product?._id)}>
        <ThemedView
          darkColor={Colors.dark.cardColor}
          lightColor={Colors.light.cardColor}
          style={{
            marginVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            marginHorizontal: 10,
            borderColor: Colors.gray,
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: product?.images[0] }}
              style={styles.productImage}
            />

            {/* Product Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.textContainer}>
                {/* Price */}
                <ThemedText type="defaultSemiBold" style={styles.priceText}>
                  <Image
                    source={require("@/assets/images/rupee-indian.png")}
                    style={styles.rupeeIcon}
                  />
                  {product?.price}/{product?.timePeriod}
                </ThemedText>

                {/* Title */}
                <ThemedText
                  type="default"
                  numberOfLines={2}
                  style={styles.titleText}
                >
                  {product?.title}
                </ThemedText>

                {/* Address */}
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={Colors.tomato}
                  />
                  <ThemedText
                    numberOfLines={1}
                    type="default"
                    style={styles.addressText}
                  >
                    {product?.address}
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionContainer}>
              {/* Favorite Icon */}
              <Ionicons
                name={
                  favoriteProducts.some(
                    (fav: Product) => fav._id === product?._id
                  )
                    ? "heart"
                    : "heart-outline"
                }
                size={24}
                color={Colors.favorite}
                onPress={() => updateProduct(product, "toggleFavorite")}
              />

              {/* Date */}
              <ThemedText style={styles.dateText}>
                {useFormateDate(product?.createdAt)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: Colors.gray,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rupeeIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.tomato,
    marginRight: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  locationContainer: {
    width: "93%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  addressText: {
    fontSize: 12,
    marginLeft: 2,
  },
  actionContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    marginTop: 8,
  },
});
