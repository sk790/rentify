import { StyleSheet, Text, TextInput, View } from "react-native";

type inputProps = {
  placeholder: string;
  label: string;
  onChange: (text: string) => void;
  name: string;
  value: string;
  line?: number;
  multiline?: boolean;
  required?: boolean;
  type?: "default" | "number-pad" | "decimal-pad" | "numeric" | "phone-pad";
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
}: inputProps) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[{ fontWeight: "600", fontSize: 16, marginVertical: 5 }]}>
        {label}
        {required && <Text style={{ color: "red", fontSize: 12 }}>*</Text>}
      </Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        numberOfLines={line || 1}
        multiline={multiline}
        // textAlignVertical="top"
        keyboardType={type}
        style={[
          {
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            paddingHorizontal: 15,
            fontWeight: 600,
            fontSize: 12,
            height: 40,
          },
          multiline && { height: line ? line * 20 : 100 },
        ]}
      />
    </View>
  );
}
export default InputField;
