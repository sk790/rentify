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
  textLightColor?: string;
  textDarkColor?: string;
  loading?: boolean;
  icon?: string;
  position?: "left" | "right";
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  lightColor,
  darkColor,
  textLightColor,
  textDarkColor,
  style,
  icon,
  loading,
  position,
  ...props
}) => {
  const theme = useColorScheme();

  // Define default light/dark theme colors
  const backgroundColor =
    theme === "dark" ? darkColor || "#333" : lightColor || Colors.tomato;
  const textColor =
    theme === "dark" ? textDarkColor || "#FFF" : textLightColor || "#FFF";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      {...props}
    >
      {icon && position === "left" && (
        <Ionicons name={icon as any} size={20} color={textColor} />
      )}
      <Text style={[styles.text, { color: textColor }]}>
        {loading ? (
          <ActivityIndicator size={"small"} color={textColor} />
        ) : (
          title
        )}
      </Text>
      {icon && position === "right" && (
        <Ionicons name={icon as any} size={20} color={textColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
