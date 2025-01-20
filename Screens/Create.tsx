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
import MyDropdown from "@/components/MyDropdown";
import { Ionicons } from "@expo/vector-icons";
import InputField from "@/components/ui/InputField";
import { category, period } from "@/constants/Data";

export default function Create({ route }: any) {
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
  // const { product } = route.params;

  const [selectedCategory, setSelectedCategory] = useState<string | null>();
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
            <MyDropdown
              onChange={handleCategoryChange}
              data={category}
              // Updatevalue={
              //   product.category.charAt(0).toUpperCase() +
              //   product.category.slice(1)
              // }
              label="Select Category"
              required
            />
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
            <MyDropdown
              label="Select Period"
              required
              data={period}
              onChange={handlePeriodChange}
            />
            <InputField
              label="Price"
              placeholder="Enter Price....."
              name="price"
              onChange={(value) => handleInputChange("price", value)}
              value={formData.price}
              type="number-pad"
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
