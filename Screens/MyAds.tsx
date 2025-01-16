import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function MyAds() {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/settings")}>
        <Text>MyAds</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
