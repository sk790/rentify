import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {};

const LoginInputFields = (props: React.ComponentProps<typeof TextInput>) => {
  return <TextInput style={styles.inputField} {...props} />;
};

export default LoginInputFields;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
