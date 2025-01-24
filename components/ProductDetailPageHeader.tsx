import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/defaultComponents/ThemedView";

export default function ProductDetailPageHeader() {
  const inset = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <ThemedView
              style={[
                {
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  justifyContent: "space-between",
                },
                { paddingTop: inset.top },
              ]}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color={Colors.tomato}
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="share-social" size={28} color={Colors.tomato} />
              </TouchableOpacity>
            </ThemedView>
          ),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
