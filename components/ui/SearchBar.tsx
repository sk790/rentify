import { StyleSheet, TextInput, Keyboard, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar({
  placeholder,
  onChange,
}: {
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);
  useEffect(() => {
    if (onChange) onChange(debounceValue.trim());
  }, [debounceValue]);

  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Automatically focus the input
      }
    }, 100); // Add a slight delay for the keyboard to open properly

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginHorizontal: 10,
      }}
    >
      <ThemedView
        darkColor={Colors.dark.cardColor}
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          borderWidth: StyleSheet.hairlineWidth,
          flex: 1,
          borderColor: Colors.gray,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      >
        <Ionicons name="search-outline" size={28} color={Colors.tomato} />
        <TextInput
          placeholder={placeholder || "Search here..."}
          placeholderTextColor={Colors.gray}
          style={{
            width: "90%",
            height: 45,
            fontWeight: "600",
            color: Colors.tomato,
          }}
          ref={inputRef}
          onChangeText={(text) => setValue(text)}
        />
      </ThemedView>
      <View>
        <Ionicons
          onPress={() => router.push("/notifications")}
          name="notifications-outline"
          size={28}
          color={Colors.tomato}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
