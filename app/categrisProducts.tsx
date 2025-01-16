import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ProductDetailPageHeader from "@/components/ProductDetailPageHeader";
import Header from "@/components/Header";
import HorizontalProductCard from "@/components/HorizontalProductCard";

export default function categrisProducts() {
  const { category } = useLocalSearchParams();
  const data = [
    {
      id: 1,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    {
      id: 2,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    {
      id: 3,
      name: "Yamaha R15 V4",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an address",
    },
    {
      id: 4,
      name: "Yamaha R15 V4ih hihinninknhnbihgibkbk hih ",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an addresvuuvjuvhjjvjvjvs",
    },
    {
      id: 5,
      name: "Yamaha R15 V4ih hihinninknhnbihgibkbk hih ",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an addresvuuvjuvhjjvjvjvs",
    },
    {
      id: 6,
      name: "Yamaha R15 V4ih hihinninknhnbihgibkbk hih ",
      images: [
        "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg",
      ],
      price: 3999,
      period: "Month",
      uploadAt: 5,
      description: "this is a description",
      title: "this is a title",
      category: "Vehicle",
      address: "this is an addresvuuvjuvhjjvjvjvs",
    },
  ];
  const products = data.filter((item) => item.category === category);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Categris Products",
          header: () => <Header />,
        }}
      />
      <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 20 }}>
        {products?.length} Ads found for {category}
      </Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              flex: 1,
            }}
          />
          <Text style={{ fontWeight: "600" }}>0 - 5 km</Text>
          <View style={{ borderWidth: StyleSheet.hairlineWidth, flex: 1 }} />
        </View>
        <HorizontalProductCard products={products} />
        {products?.length === 0 && <Text>No products found</Text>}
        {products?.length === 20 && <Button title="Load more" />}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
