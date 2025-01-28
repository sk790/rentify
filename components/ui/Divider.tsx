import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Divider() {
  return (
    <View
      style={{
        marginVertical: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.tomato,
      }}
    />
  );
}

const styles = StyleSheet.create({});
