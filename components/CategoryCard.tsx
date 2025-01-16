import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CategoryCard({ item }: any) {
  const image =
    "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v466e5433ef20f5.jpg";
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#F9F9F9",
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 70, height: 70, borderRadius: 10, marginTop: 10 }}
      />
      <Text style={{ fontSize: 12 }}>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
