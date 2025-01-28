import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  value: string;
  onChange: any;
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  length?: number;
  secure?: boolean;
};

export default function AuthInput({
  value,
  onChange,
  placeholder,
  keyboardType,
  secure,
  icon,
  length,
}: Props) {
  const [isSecure, setIsSecure] = React.useState(false);
  const toggle = () => setIsSecure(!isSecure);
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }} // Start from the top-left corner
        end={{ x: 1, y: 1 }} // End at the bottom-right corner
        colors={["#4c669f", "#3b5998", "#192f6a"]} // Gradient colors
        style={{
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Ionicons name={icon} size={25} color={"#192f6a"} />
          <TextInput
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={"#192f6a"}
            maxLength={length}
            secureTextEntry={isSecure}
            keyboardType={keyboardType}
            value={value}
            style={{
              color: Colors.white,
              paddingHorizontal: 10,
              paddingVertical: 15,
              fontSize: 14,
              width: "100%",
              fontWeight: "600",
            }}
          />
          {secure && (
            <>
              <Ionicons
                name="eye-outline"
                size={25}
                onPress={toggle}
                color={Colors.white}
                style={{ position: "absolute", right: 0 }}
              />
              {isSecure && (
                <>
                  <Ionicons
                    onPress={toggle}
                    name="eye-off-outline"
                    size={25}
                    color={Colors.white}
                    style={{ position: "absolute", right: 0 }}
                  />
                </>
              )}
            </>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({});
