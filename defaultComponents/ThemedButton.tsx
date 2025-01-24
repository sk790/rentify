import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { useColorScheme } from "react-native";

type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  color?: string;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  position?: "left" | "right";
  variant?: "outline" | "default";
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  lightColor,
  darkColor,
  style,
  icon,
  color,
  loading = false,
  position = "left",
  variant = "default",
  ...props
}) => {
  const theme = useColorScheme();

  // Determine button colors based on theme
  const backgroundColor =
    variant === "outline"
      ? "transparent"
      : theme === "dark"
      ? darkColor || "#333"
      : lightColor || Colors.tomato;

  // Render icon based on position
  const renderIcon = () =>
    icon && <Ionicons name={icon as any} size={20} color={color} />;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "outline" ? styles.outline : styles.default,
        { backgroundColor, borderColor: Colors.tomato },
        style,
      ]}
      {...props}
    >
      {position === "left" && renderIcon()}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? Colors.tomato : color}
        />
      ) : (
        <Text style={[styles.text, { color: color }]}>{title}</Text>
      )}
      {position === "right" && renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, // Add spacing between elements
    borderRadius: 5,
    padding: 10,
  },
  outline: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  default: {
    backgroundColor: Colors.tomato,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
