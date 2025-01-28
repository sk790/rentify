import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function notifications() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: "black", light: Colors.white }}
      >
        <ThemedView style={{ flex: 1 }}>
          <ThemedText
            style={{
              fontSize: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            notifications
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
