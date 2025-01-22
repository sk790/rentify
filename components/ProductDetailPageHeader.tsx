import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function ProductDetailPageHeader() {
  const inset = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 15,
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
            </View>
          ),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
