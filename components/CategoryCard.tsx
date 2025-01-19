import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
type Props = {
  image: string;
  label: string;
};

export default function CategoryCard({ image, label }: Props) {
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
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
