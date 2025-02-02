import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { Stack } from "expo-router";

export default function notifications() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Notifications" }} />
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText style={{ fontSize: 20 }}>notifications</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({});
