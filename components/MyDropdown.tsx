import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";

type Props = {
  onChange: (value: string | null) => void;
  data: { label: string; value: string }[];
  label: string;
  required?: boolean;
};

export default function MyDropdown({ onChange, data, label, required }: Props) {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (item: { label: string; value: string }) => {
    setValue(item.value); // Update local state with the selected value.
    onChange(item.value); // Pass the selected value to the parent.
    setIsFocus(false); // Close the dropdown.
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
        {label}
        {required && <Text style={{ color: "red", fontSize: 12 }}>*</Text>}
      </Text>
      <Dropdown
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
    </View>
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
