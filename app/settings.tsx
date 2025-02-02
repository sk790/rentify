import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";

export default function settings() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>settings</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
