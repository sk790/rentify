import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import MyDropdown from "@/components/ui/MyDropdown";
import InputField from "@/components/ui/InputField";
import { category, period, status } from "@/constants/Data";
import ParallaxScrollView from "@/components/ui/ParallaxScrollView";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";

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

  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

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
      !formData.productName ||
      !formData.description ||
      !formData.price ||
      !formData.address ||
      !formData.period
    ) {
      return Alert.alert("Error", "Please fill all the fields.");
    }

    router.push({
      pathname: "/(listing)/add-cordinets",
      params: { formData: JSON.stringify(formData) },
    });
  };
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{
          dark: Colors.lightGray,
          light: Colors.light.background,
        }}
      >
        <ThemedView style={{ marginTop: 10, flex: 1 }}>
          <ThemedText type="subtitle">List Your Service</ThemedText>
          <ThemedText type="default" style={{ fontSize: 14 }}>
            Provide details about the service you're offering.
          </ThemedText>
          <ThemedView>
            <MyDropdown
              onChange={handleCategoryChange}
              data={category}
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
              helperText="Product name ex: table, chair, sofa."
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
              helperText="description must be more than 20 words."
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
              helperText="Title ex: this product available for rent."
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
              helperText="address should be matched with your product."
            />
          </ThemedView>
          <ThemedButton
            icon="arrow-forward"
            position="right"
            darkColor={Colors.dark.cardColor}
            color={Colors.white}
            title="Next"
            onPress={handleNextPage}
          />
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
