import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap; // Restrict to valid Ionicons names
  iconSize?: number;
  color: string;
  length?: string;
  bgColor?: string;
  label: string;
  rounded?: number;
  onClick?: () => void;
};
export default function MyButton({
  icon,
  iconSize,
  color,
  length,
  bgColor,
  label,
  rounded,
  onClick,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // paddingVertical: 5,
          borderRadius: rounded || 5,
          gap: 5,
          paddingHorizontal: 15,
          width: length as any,
          padding: 10,
          backgroundColor: bgColor || Colors.white,
        },
      ]}
      onPress={onClick}
    >
      <Text
        style={{
          color: color,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      {icon && <Ionicons name={icon} size={iconSize} color={color} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
