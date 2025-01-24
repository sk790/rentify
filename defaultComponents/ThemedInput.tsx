import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

type inputProps = {
  placeholder: string;
  label: string;
  onChange: (text: string) => void;
  name: string;
  value: string | undefined;
  line?: number;
  multiline?: boolean;
  required?: boolean;
  type?: "default" | "number-pad" | "decimal-pad" | "numeric" | "phone-pad";
  helperText?: string;
};

export default function ThemedInput({
  placeholder,
  label,
  onChange,
  name,
  value,
  line,
  multiline,
  required,
  type,
  helperText,
}: inputProps) {
  return (
    <View>
      <FloatingLabelInput
        label={required ? label + "*" : label}
        placeholder={placeholder}
        inputStyles={{ color: Colors.white }}
        onChangeText={onChange}
        value={value}
      />
      {helperText && (
        <ThemedText type="default" style={{ fontSize: 10 }}>
          {helperText}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
