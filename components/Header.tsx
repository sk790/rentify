import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/defaultComponents/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { ThemedView } from "@/defaultComponents/ThemedView";
import SearchBar from "./ui/SearchBar";

export default function Header() {
  const { user } = useAuth();
  const theme = useColorScheme();
  const bg = theme === "dark" ? Colors.black : Colors.white;
  return (
    <ThemedView style={{ flexDirection: "column" }}>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderRadius: 15,
          marginBottom: 10,
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
        <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
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
        </ThemedView>
      </ThemedView>
      {/* <SearchBar /> */}
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/categrisProducts")}
          style={{ width: "85%" }}
        >
          <ThemedView
            darkColor={Colors.dark.cardColor}
            lightColor={Colors.light.cardColor}
            style={{
              padding: 10,
              borderColor: Colors.tomato,
              borderWidth: 1,
              height: 45,
              gap: 5,
              borderRadius: 10,
              flexDirection: "row",
              flex: 1,
            }}
          >
            <Ionicons
              onPress={() => router.push("/notifications")}
              name="search-outline"
              style={{ marginLeft: 5 }}
              size={28}
              color={Colors.tomato}
            />
            <ThemedText style={{ fontWeight: "600" }}>Search here</ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <Ionicons
          onPress={() => router.push("/notifications")}
          name="notifications-outline"
          size={28}
          color={Colors.tomato}
          style={{ marginRight: 10 }}
        />
      </ThemedView>
    </ThemedView>
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
