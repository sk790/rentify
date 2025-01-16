import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function settings() {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <View>
      <Text>{auth ? "true" : "false"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
