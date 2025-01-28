import React, { useEffect, useState } from "react";
import { View, useColorScheme, Alert } from "react-native";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import InputField from "@/components/ui/InputField";
import MyDropdown from "@/components/MyDropdown";
import { period, status } from "@/constants/Data";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useProducts } from "@/context/ProductContext";
import MyAlert from "@/components/ui/MyAlert";
import { useModal } from "@/context/ModalContext";
import { Product } from "@/types";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function UpdateProduct() {
  const { openAlertModal, closeAlertModal } = useModal();
  const theme = useColorScheme();
  const { updateFormData } = useLocalSearchParams();
  const data = JSON.parse(updateFormData as string);
  const { updateProduct } = useProducts();

  const [productData, setProductData] = useState<Product>(data);

  const handleInputChange = (key: string, value: string) => {
    setProductData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePeriodChange = (value: string | null) => {
    setProductData((prev: any) => ({
      ...prev,
      timePeriod: value,
    }));
  };

  const handleStatusChange = (value: string | null) => {
    setProductData((prev: any) => ({
      ...prev,
      status: value,
    }));
  };
  const handleUpdateProduct = async () => {
    const res = await fetch(`${BASE_URL}/api/product/${productData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    Alert.alert("Success", "Product updated successfully");
    if (res.ok) {
      updateProduct(productData, "update");
      updateProduct(productData, "toggleRent");
      router.back();
      closeAlertModal();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Update Product",
          statusBarBackgroundColor:
            theme === "dark" ? Colors.black : Colors.white,
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: theme === "dark" ? "black" : "white",
                borderBottomWidth: 1,
                borderBottomColor: theme === "dark" ? "#444" : "#ccc",
              }}
            />
          ),
          headerTintColor: theme === "dark" ? "white" : "black",
          headerTitleStyle: { color: theme === "dark" ? "white" : "black" },
        }}
      />
      <ThemedView style={{ height: "100%" }}>
        <ThemedView style={{ flexDirection: "column", height: "87%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <MyDropdown
              label="Select Period"
              required
              data={period}
              onChange={handlePeriodChange}
            />
            <InputField
              label="Price"
              name="price"
              value={productData?.price?.toString()}
              onChange={(text: string) => handleInputChange("price", text)}
              placeholder="Enter Price"
              required
              type="number-pad"
            />
            <InputField
              label="Description"
              name="description"
              value={productData?.description}
              onChange={(text: string) =>
                handleInputChange("description", text)
              }
              placeholder="Enter Description"
              required
              multiline
              line={2}
            />
            <InputField
              label="Address"
              name="address"
              value={productData?.address}
              onChange={(text: string) => handleInputChange("address", text)}
              placeholder="Enter Address"
              required
              multiline
              line={4}
            />
            <MyDropdown
              label="Select Status"
              required
              data={status}
              onChange={handleStatusChange}
            />
          </View>
          <ThemedButton
            icon="arrow-forward-outline"
            position="right"
            color="white"
            title="Next"
            onPress={openAlertModal}
          />
          {/* </ScrollView> */}
        </ThemedView>
        <MyAlert
          message="Are you sure you want to update this product?"
          onConfirm={handleUpdateProduct}
          onCancel={closeAlertModal}
          title="Update Product"
        />
      </ThemedView>
    </>
  );
}
