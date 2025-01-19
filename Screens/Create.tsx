import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
// import MyDropdown from "@/components/MyDropdown";
import { Ionicons } from "@expo/vector-icons";

type inputProps = {
  placeholder: string;
  label: string;
  onChange: (text: string) => void;
  name: string;
  value: string;
  line?: number;
  multiline?: boolean;
  required?: boolean;
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
}: inputProps) {
  return (
    <>
      <View style={{ marginVertical: 10 }}>
        <Text style={[{ fontWeight: "600", fontSize: 16, marginVertical: 5 }]}>
          {label}
          {required && <Text style={{ color: "red", fontSize: 12 }}>*</Text>}
        </Text>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          numberOfLines={line}
          multiline={multiline}
          textAlignVertical="top"
          style={[
            {
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 5,
              paddingHorizontal: 15,
              fontWeight: 600,
              fontSize: 12,
            },
            multiline && { height: line ? line * 20 : 100 },
          ]}
        />
      </View>
    </>
  );
}

export default function Create() {
  const [formData, setFormData] = useState({
    productName: "",
    title: "",
    description: "",
    price: "",
    address: "",
    category: "",
    period: "",
    cordinets: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value);
    formData.category = value?.toLocaleLowerCase() as string;
  };
  const handlePeriodChange = (value: string | null) => {
    setSelectedPeriod(value);
    formData.period = value as string;
  };
  const category = [
    { label: "Vehicle", value: "1" },
    { label: "Furniture", value: "2" },
    { label: "Clothing", value: "3" },
    { label: "Accessories", value: "4" },
    { label: "Jewellery", value: "5" },
    { label: "Fashion", value: "7" },
    { label: "Sports", value: "8" },
    { label: "Music", value: "9" },
    { label: "Gaming", value: "10" },
    { label: "Gadgets", value: "11" },
    { label: "Beauty", value: "12" },
  ];
  const period = [
    { label: "Yearly", value: "1" },
    { label: "Monthly", value: "2" },
    { label: "Weakly", value: "3" },
    { label: "Daily", value: "4" },
  ];
  const handleNextPage = () => {
    if (
      !formData.category ||
      !formData.description ||
      !formData.title ||
      !formData.price ||
      !formData.address ||
      !formData.period ||
      !formData.productName
    ) {
      return alert("Please fill all the fields");
    }
    router.push({
      pathname: "/(listing)/add-cordinets",
      params: { formData: JSON.stringify(formData) },
    });
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Listing" }} />
      <ScrollView>
        <View style={{ padding: 5, margin: 5, backgroundColor: Colors.white }}>
          <Text style={{ fontWeight: "600", fontSize: 20 }}>
            List Your Service
          </Text>
          <Text style={{ fontSize: 12, color: Colors.gray }}>
            Provide details about the service you're offering.
          </Text>
          <View style={{ marginTop: 10 }}>
            {/* <MyDropdown
              onChange={handleCategoryChange}
              data={category}
              label="Select Category"
              required
            /> */}
            <InputField
              label="Product Name"
              placeholder="Product name....."
              name="productName"
              required
              onChange={(value) => handleInputChange("productName", value)}
              value={formData.productName}
            />
            <InputField
              label="Description"
              placeholder="Enter description...."
              name="description"
              line={4}
              required
              multiline={true}
              onChange={(value) => handleInputChange("description", value)}
              value={formData.description}
            />
            {/* <MyDropdown
              label="Select Period"
              required
              data={period}
              onChange={handlePeriodChange}
            /> */}
            <InputField
              label="Price"
              placeholder="Enter Price....."
              name="price"
              onChange={(value) => handleInputChange("price", value)}
              value={formData.price}
              required
            />
            <InputField
              label="Title"
              placeholder="Title...."
              name="title"
              onChange={(value) => handleInputChange("title", value)}
              value={formData.title}
              required
            />

            <InputField
              label="Address"
              placeholder="Enter your address....."
              name="address"
              line={4}
              required
              multiline
              onChange={(value) => handleInputChange("address", value)}
              value={formData.address}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light,
                padding: 15,
                borderRadius: 5,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
              onPress={handleNextPage}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                Next
              </Text>
              <Ionicons name="arrow-forward-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
