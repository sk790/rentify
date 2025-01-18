import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";

export default function Chat() {
  const { setAuth } = useAuth();
  const handleLogout = async () => {
    setAuth(false);
    await AsyncStorage.removeItem("token");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Available soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
