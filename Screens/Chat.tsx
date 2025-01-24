import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";

export default function Chat() {
  const { setAuth } = useAuth();
  const handleLogout = async () => {
    setAuth(false);
    await AsyncStorage.removeItem("token");
  };
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Available soon</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
