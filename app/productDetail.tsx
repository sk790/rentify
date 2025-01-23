import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Navigator, router, Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductDetailPageHeader from "@/components/ProductDetailPageHeader";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@env";
import { Product } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/defaultComponents/ThemedText";
import Divider from "@/components/ui/Divider";
import ImageSlider from "@/components/ui/ImageSlider";
import UserMap from "@/components/ui/UsreMap";
// import ruppee from "@/assets/images/rupee-indian.png";

export default function productDetail() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const { products, favoriteProducts, updateFavorite } = useProducts();
  const { user } = useAuth();
  const [like, setLike] = useState(false);
  useEffect(() => {
    const p = products.find((p) => p._id === productId);
    setProduct(p);
  }, [favoriteProducts]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  const userProfile = (userId: string) => {
    router.push({
      pathname: "/profile",
      params: { userId },
    });
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ProductDetailPageHeader />,
        }}
      />
      <ScrollView style={{}}>
        <View>
          {product?.images && <ImageSlider images={product.images} />}
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                <Image
                  source={require("../assets/images/rupee-indian.png")}
                  style={{ width: 16, height: 16, tintColor: Colors.tomato }}
                />
                {product?.price} / {product?.timePeriod}
              </Text>
              <TouchableOpacity onPress={() => updateFavorite(product!)}>
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
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {product?.productName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color={Colors.tomato}
              />
              <Text style={{ fontSize: 14, color: Colors.gray }}>
                {product?.address}
              </Text>
            </View>
          </View>
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
                { color: product?.status === "Available" ? "green" : "red" },
              ]}
            >
              {product?.status}
            </ThemedText>
          </View>
          <Divider />
          <View style={{ marginHorizontal: 15, gap: 10 }}>
            {/* <Divider /> */}
            <ThemedText type="defaultSemiBold">Details</ThemedText>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <ThemedText type="defaultSemiBold">Product</ThemedText>
              <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
                {product?.productName}
              </ThemedText>
            </View>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <ThemedText type="defaultSemiBold">Category</ThemedText>
              <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
                {product?.category}
              </ThemedText>
            </View>
          </View>
          <Divider />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", margin: 10 }}>
              Description
            </Text>
            <Text style={{ fontSize: 14, marginHorizontal: 10, marginTop: 5 }}>
              {product?.description}
            </Text>
          </View>
          <Divider />
          <TouchableOpacity onPress={() => userProfile(product?.user?._id!)}>
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: Colors.white,
                borderColor: Colors.tomato,
                borderWidth: 2,
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
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
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  {product?.user?.name}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={Colors.tomato}
              />
            </View>
          </TouchableOpacity>
          <View>
            {product?.productCordinates && (
              <UserMap cordinets={product.productCordinates} />
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
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
              color="white"
            />
            <Text style={{ color: Colors.white, fontWeight: "600" }}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
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
            <Ionicons name="logo-whatsapp" size={28} color="white" />
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Whatsapp
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
