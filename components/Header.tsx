import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/defaultComponents/ThemedText";

export default function Header() {
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: Colors.white,
        }}
      >
        <ThemedText
          type="subtitle"
          style={{
            color: Colors.tomato,
            fontStyle: "italic",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            backgroundColor: "black",
          }}
        >
          RENTIFY
        </ThemedText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location-outline" size={20} color={Colors.tomato} />
          <ThemedText type="defaultSemiBold" style={{ fontSize: 14 }}>
            Rahamatpur, Belra M
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
            backgroundColor: "white",
            flex: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Ionicons name="search-outline" size={28} color={Colors.tomato} />
          <TextInput
            placeholder="Search"
            style={{
              backgroundColor: Colors.white,
              width: "90%",
              fontWeight: "600",
              color: Colors.tomato,
            }}
          />
        </View>
        <View>
          <Ionicons
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
