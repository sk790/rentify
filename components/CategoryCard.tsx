import { Image, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/defaultComponents/ThemedView";
type Props = {
  label: string;
  image: string;
};

export default function CategoryCard({ image, label }: Props) {
  const theme = useColorScheme();
  const bg = theme === "dark" ? Colors.black : Colors.white;
  return (
    <>
      <ThemedView>
        <Image
          source={{ uri: image }}
          style={{ width: 70, height: 70, borderRadius: 10, marginTop: 10 }}
        />
        <ThemedText type="defaultSemiBold" style={{ fontSize: 10 }}>
          {label}
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({});
