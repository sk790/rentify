import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ui/ThemedView";

export default function Divider() {
  return (
    <ThemedView
      style={{
        marginVertical: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.primary,
      }}
    />
  );
}
