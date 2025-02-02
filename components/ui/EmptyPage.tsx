import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  image?: string;
  msg: string;
  btnText?: string;
  onClick?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function EmptyPage({
  image,
  msg,
  btnText,
  onClick,
  icon,
}: Props) {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%", // Ensure it takes full screen height
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
        {msg}
      </ThemedText>
      {btnText && (
        <ThemedButton
          style={{ marginTop: 20 }}
          onPress={onClick}
          title={btnText}
          icon={icon}
          position="right"
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
