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

export default function HorizontalProductCard({ products }: any) {
  const getProductDetails = (productId: number) => {
    router.push({ pathname: "/productDetail", params: { productId } });
  };
  const { updateFavoriteProducts, favoriteProducts } = useProducts();

  return (
    <>
      <ThemedView>
        {products?.map((product: any, index: number) => (
          <TouchableOpacity
            onPress={() => getProductDetails(product._id)}
            key={index}
            style={styles.cardContainer}
          >
            {/* Product Image */}
            <Image
              source={{ uri: product.images[0] }}
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
                  {product.price}/{product.timePeriod}
                </ThemedText>

                {/* Title */}
                <ThemedText
                  type="default"
                  numberOfLines={2}
                  style={styles.titleText}
                >
                  {product.title}
                </ThemedText>

                {/* Address */}
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={Colors.gray}
                  />
                  <ThemedText
                    numberOfLines={1}
                    type="default"
                    style={styles.addressText}
                  >
                    {product.address}
                  </ThemedText>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionContainer}>
                {/* Favorite Icon */}
                <Ionicons
                  name={
                    favoriteProducts.some(
                      (fav: Product) => fav._id === product._id
                    )
                      ? "heart"
                      : "heart-outline"
                  }
                  size={24}
                  color={Colors.favorite}
                  onPress={() => updateFavoriteProducts(product, "toggle")}
                />

                {/* Date */}
                <Text style={styles.dateText}>
                  {useFormateDate(product.createdAt)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.tomato,
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
    color: Colors.tomato,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rupeeIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  addressText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 4,
  },
  actionContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 8,
  },
});
