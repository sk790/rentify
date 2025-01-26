import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/defaultComponents/ThemedText";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const theme = useColorScheme();
  const bg = theme === "dark" ? Colors.black : Colors.white;
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderRadius: 15,
          marginBottom: 10,
          backgroundColor: bg,
        }}
      >
        <ThemedText
          type="subtitle"
          style={{
            color: Colors.white,
            fontStyle: "italic",
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 15,
            backgroundColor: Colors.tomato,
          }}
        >
          RENTIFY
        </ThemedText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location-outline" size={20} color={Colors.tomato} />
          <ThemedText
            type="default"
            style={{ fontSize: 13, width: "65%" }}
            numberOfLines={1}
          >
            {user?.address || "Update Address"}
          </ThemedText>
          <Ionicons
            name="chevron-down-outline"
            size={20}
            color={Colors.tomato}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.tomato,
            backgroundColor: bg,
            flex: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Ionicons name="search-outline" size={28} color={Colors.tomato} />
          <TextInput
            placeholder="Search"
            style={{
              backgroundColor: bg,
              width: "90%",
              height: 40,
              fontWeight: "600",
              color: Colors.tomato,
            }}
            placeholderTextColor={
              bg === Colors.white ? Colors.tomato : Colors.white
            }
          />
        </View>
        <View>
          <Ionicons
            onPress={() => router.push("/notifications")}
            name="notifications-outline"
            size={28}
            color={Colors.tomato}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 15,
    backgroundColor: Colors.white,
  },
  searchbar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  searchText: {
    color: Colors.gray,
  },
});
