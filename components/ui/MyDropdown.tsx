import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState } from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {
  onChange: (value: string | null) => void;
  data: { label: string; value: string }[];
  label: string;
  required?: boolean;
};

export default function MyDropdown({ onChange, data, label, required }: Props) {
  const theme = useColorScheme();
  const [value, setValue] = useState<string | null>();
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (item: { label: string; value: string }) => {
    setValue(item.value); // Update local state with the selected value.
    onChange(item.label); // Pass the selected value to the parent.
    setIsFocus(false); // Close the dropdown.
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold" style={{ marginVertical: 5 }}>
        {label}
        {required && <Text style={{ color: "red", fontSize: 12 }}>*</Text>}
      </ThemedText>
      <Dropdown
        placeholderStyle={{
          color: theme === "dark" ? Colors.white : "black",
          fontSize: 16,
          fontWeight: 600,
        }}
        selectedTextStyle={{
          color: theme === "dark" ? Colors.white : "#aaa",
          fontSize: 13,
          fontWeight: "600",
          paddingLeft: 8,
        }}
        iconColor={theme === "dark" ? Colors.white : "black"}
        itemContainerStyle={{
          backgroundColor:
            theme === "dark" ? Colors.dark.cardColor : Colors.light.cardColor,
        }}
        itemTextStyle={{
          color: theme === "dark" ? Colors.white : "black",
          fontWeight: "600",
          fontSize: 14,
        }}
        activeColor={theme === "dark" ? "black" : Colors.white}
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select" : "..."}
        value={value} // Bind the dropdown value to the state.
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange} // Handle value change.
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // backgroundColor: "white",
    // borderRadius: 5,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    fontWeight: 600,
    padding: 8,
  },
});
