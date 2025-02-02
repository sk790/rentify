import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductDetailPageHeader from "@/components/ui/ProductDetailPageHeader";
import { Colors } from "@/constants/Colors";
import { Product } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { ThemedText } from "@/components/ui/ThemedText";
import Divider from "@/components/ui/Divider";
import ImageSlider from "@/components/ui/ImageSlider";
// import UserMap from "@/components/ui/UsreMap";
import { ThemedView } from "@/components/ui/ThemedView";
import { getProductDetail } from "@/actions";

export default function productDetail() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const { favoriteProducts, updateProduct, myProductsOnRent } = useProducts();
  if (!productId) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </ThemedView>
    );
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductDetail(productId as string);
      setProduct(data.product);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </ThemedView>
    );
  }
  const userProfile = (userId: string) => {
    router.push({ pathname: "/profile", params: { userId } });
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ProductDetailPageHeader />,
        }}
      />
      <ScrollView>
        <ThemedView>
          {product?.images && <ImageSlider images={product.images} />}
          <ThemedView style={{ marginHorizontal: 15, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <ThemedView
                style={{ alignItems: "center", flexDirection: "row" }}
              >
                <Image
                  source={require("../assets/images/rupee-indian.png")}
                  style={{ width: 14, height: 14, tintColor: Colors.primary }}
                />
                <ThemedText type="defaultSemiBold">
                  {product?.price}/{product?.timePeriod}
                </ThemedText>
              </ThemedView>
              <TouchableOpacity
                onPress={() => updateProduct(product!, "toggleFavorite")}
              >
                <Ionicons
                  name={
                    favoriteProducts.some(
                      (p: Product) => p._id === product?._id
                    )
                      ? "heart-sharp"
                      : "heart-outline"
                  }
                  size={30}
                  color="#F54"
                />
              </TouchableOpacity>
            </View>
            <ThemedText type="defaultSemiBold" style={{ fontSize: 14 }}>
              {product?.productName}
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 10,
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color={Colors.primary}
              />
              <ThemedText numberOfLines={2} style={{ fontSize: 12 }}>
                {product?.address}
              </ThemedText>
            </View>
          </ThemedView>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              gap: 30,
              marginHorizontal: 15,
            }}
          >
            <ThemedText type="defaultSemiBold">{"Status"}</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={[
                { flex: 1 },
                {
                  color: myProductsOnRent.some(
                    (p: Product) => p._id === product?._id
                  )
                    ? "red"
                    : "green",
                },
              ]}
            >
              {myProductsOnRent.some((p: Product) => p._id === product?._id)
                ? "Rented"
                : "Available"}
            </ThemedText>
          </View>
          <Divider />
          <ThemedView style={{ marginHorizontal: 15, gap: 10 }}>
            {/* <Divider /> */}
            <ThemedText type="defaultSemiBold">Details</ThemedText>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <ThemedText type="defaultSemiBold">Product</ThemedText>
              <ThemedText style={{ flex: 1, fontSize: 14 }}>
                {product?.productName}
              </ThemedText>
            </View>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <ThemedText type="defaultSemiBold">Category</ThemedText>
              <ThemedText style={{ flex: 1 }}>{product?.category}</ThemedText>
            </View>
          </ThemedView>
          <Divider />
          <View style={{ marginHorizontal: 10, gap: 10 }}>
            <ThemedText type="defaultSemiBold">Description</ThemedText>
            <ThemedText style={{ fontSize: 14 }}>
              {product?.description}
            </ThemedText>
          </View>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              if (product?.user._id) userProfile(product.user._id);
            }}
          >
            <ThemedView
              darkColor={Colors.dark.cardColor}
              lightColor={Colors.light.cardColor}
              style={{
                margin: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: Colors.gray,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                marginBottom: 60,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={{
                    uri:
                      product?.user?.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s",
                  }}
                  style={{ height: 50, width: 50, borderRadius: 50 }}
                />
                <ThemedText type="defaultSemiBold">
                  {product?.user?.name}
                </ThemedText>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={Colors.primary}
              />
            </ThemedView>
          </TouchableOpacity>
          <View>
            {/* {product?.productCordinates && (
              <UserMap coordinates={product?.productCordinates} />
            )} */}
          </View>
        </ThemedView>
      </ScrollView>
      <ThemedView
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          padding: 5,
          borderRadius: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/userChat",
              params: { chatUser: JSON.stringify(product?.user) },
            })
          }
          style={{
            backgroundColor: Colors.gray,
            padding: 10,
            borderRadius: 5,
            width: "49%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-sharp"
              size={28}
              color={Colors.white}
            />
            <Text style={{ color: Colors.white, fontWeight: "600" }}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://wa.me/${product?.user?.phone}`)
          }
          style={{
            backgroundColor: "green",
            padding: 5,
            borderRadius: 5,
            width: "49%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Ionicons name="logo-whatsapp" size={28} color={Colors.white} />
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Whatsapp
            </Text>
          </View>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({});
