import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, TextInput } from "react-native";

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

function InputField({
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
  // Get dynamic background color based on theme
  const backgroundColor = useThemeColor(
    { light: Colors.light.cardColor, dark: Colors.dark.cardColor }, // Replace with your desired colors
    "background"
  );
  const borderColor = useThemeColor(
    { light: Colors.gray, dark: Colors.gray }, // Replace with your desired colors
    "border"
  );
  const color = useThemeColor(
    { light: "#000", dark: "#fff" }, // Replace with your desired colors
    "text"
  );

  return (
    <ThemedView>
      <ThemedText
        style={[{ fontWeight: "600", fontSize: 16, marginVertical: 5 }]}
      >
        {label}
        {required && <Text style={{ color: "red", fontSize: 12 }}>*</Text>}
      </ThemedText>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        numberOfLines={line || 1}
        multiline={multiline}
        keyboardType={type}
        style={[
          {
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            paddingHorizontal: 15,
            fontWeight: "600",
            fontSize: 12,
            color,
            height: 40,
            backgroundColor, // Dynamic background color
            borderColor, // Dynamic border color
          },
          multiline && {
            height: line ? line * 20 : 100,
            textAlignVertical: "top",
          }, // Adjust height for multiline
        ]}
        placeholderTextColor={useThemeColor(
          { light: "#aaa", dark: "#666" }, // Placeholder colors for light/dark mode
          "placeholder"
        )}
      />
      {helperText && (
        <ThemedText style={{ fontSize: 10, color: Colors.gray }}>
          {helperText}
        </ThemedText>
      )}
    </ThemedView>
  );
}

export default InputField;
