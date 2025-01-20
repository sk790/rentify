import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const MyInputField = (props: React.ComponentProps<typeof TextInput>) => {
  return <TextInput style={styles.inputField} {...props} />;
};

export default MyInputField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: Colors.white,
    alignSelf: "stretch",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
