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

export default function productDetail() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const getProductDetails = async () => {
        const res = await fetch(`${BASE_URL}/api/product/${productId}`);
        const data = await res.json();
        // console.log(data);
        setLoading(false);
        setProduct(data.product);
      };
      getProductDetails();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [productId]);
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
          <Image
            source={{
              uri:
                product?.images[0] ||
                "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
            }}
            style={{ height: 300, width: "100%" }}
          />
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
                ₹ {product?.price} / {product?.timePeriod}
              </Text>
              <Ionicons name="heart-outline" size={28} color="black" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {product?.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Ionicons name="location-outline" size={18} color="black" />
              <Text style={{ fontSize: 14, color: Colors.gray }}>
                {product?.address}
              </Text>
            </View>
          </View>
          <View style={{ margin: 10, borderWidth: StyleSheet.hairlineWidth }} />
          <View style={{ marginHorizontal: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Details</Text>
            <Text style={{ fontSize: 14, marginTop: 10 }}>
              <Text style={{ fontWeight: "600" }}>Product</Text>
              <Text style={{ color: Colors.gray }}>{product?.productName}</Text>
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              borderWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", margin: 10 }}>
              Description
            </Text>
            <Text style={{ fontSize: 14, marginHorizontal: 10, marginTop: 5 }}>
              {product?.description}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              borderWidth: StyleSheet.hairlineWidth,
            }}
          />
          <TouchableOpacity onPress={() => userProfile(product?.user?._id!)}>
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={{
                    uri:
                      product?.images[0] ||
                      "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
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
                color="black"
              />
            </View>
          </TouchableOpacity>

          <View>
            <Image
              source={{
                uri:
                  product?.images[0] ||
                  "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
              }}
              style={{ height: 300, width: "100%" }}
            />
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
