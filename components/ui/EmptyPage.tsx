import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";

type Props = {
  image?: string;
  msg: string;
};

export default function EmptyPage({ image, msg }: Props) {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={{
          uri:
            image || "https://cdn-icons-png.flaticon.com/256/1178/1178428.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>
        {" "}
        {msg}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
