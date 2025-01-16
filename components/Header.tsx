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

export default function Header() {
  const inset = useSafeAreaInsets();
  return (
    <ScrollView>
      <View style={[{ paddingTop: inset.top, flexDirection: "column" }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            gap: 15,
            backgroundColor: Colors.white,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "600", color: Colors.primary }}
          >
            RENTIFY
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Ionicons name="location-outline" size={20} color="black" />
            <Text>Rahamatpur, Belra M</Text>
            <Ionicons name="chevron-down-outline" size={20} color="black" />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              backgroundColor: "white",
              flex: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Ionicons name="search-outline" size={28} color="black" />
            <TextInput
              placeholder="Search"
              style={{
                backgroundColor: Colors.white,
                width: "90%",
                fontWeight: "600",
                color: Colors.gray,
              }}
            />
          </View>
          <View>
            <Ionicons name="notifications-outline" size={28} color="black" />
          </View>
        </View>
      </View>
    </ScrollView>
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
