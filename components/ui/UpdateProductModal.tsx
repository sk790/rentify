import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
  Alert,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors"; // Add your colors or use default values
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { useModal } from "@/context/ModalContext";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import { Product, User } from "@/types";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { BASE_URL } from "@env";
import { useAuth } from "@/context/AuthContext";
import InputField from "./InputField";
import MyDropdown from "../MyDropdown";
import { category, period, status } from "@/constants/Data";
import { useProducts } from "@/context/ProductContext";
import { router } from "expo-router";

export default function UpdateProductModal({ product }: { product: Product }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animation value for smooth transitions
  const { closeProductModal, isProductModalVisible } = useModal();
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme();

  const { updateProductData } = useProducts();
  const [productData, setProductData] = useState<any>();

  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isProductModalVisible) {
      setProductData(updateProductData);
      setModalVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300, // Smooth fade-in duration
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100, // Smooth fade-out duration
        useNativeDriver: true,
      }).start(() => setModalVisible(false)); // Close modal after animation ends
    }
  }, [isProductModalVisible, closeProductModal, modalVisible, animation]);

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [700, 0], // Start from bottom and slide up
  });

  const handleProductUpdate = async () => {
    try {
      console.log(productData);
      closeProductModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleInputChange = (key: string, value: string) => {
    setProductData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePeriodChange = (value: string | null) => {
    setSelectedPeriod(value);
    updateProductData.timePeriod = value as string;
  };
  const handleStatusChange = (value: string | null) => {
    setSelectedStatus(value);
    updateProductData.status = value as string;
  };

  return (
    <ThemedView>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade" // We'll handle animation ourselves
        onRequestClose={closeProductModal}
      >
        <ThemedView style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme === "dark" ? Colors.black : Colors.white,
                borderWidth: 1,
                borderColor: Colors.gray,
              },
              { transform: [{ translateY: modalTranslateY }] },
            ]}
          >
            {/* Modal Content */}
            <ThemedView
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ThemedText type="subtitle" style={{ flex: 1 }}>
                Edit Product
              </ThemedText>
              <Ionicons
                onPress={closeProductModal}
                name="close"
                size={38}
                color={Colors.tomato}
              />
            </ThemedView>
            <ScrollView>
              <InputField
                label="Product Name"
                name="productName"
                value={productData?.productName}
                onChange={(text: string) =>
                  handleInputChange("productName", text)
                }
                placeholder="Enter product name"
                helperText="This is the name of the product"
                required
              />
              <InputField
                label="Title"
                name="title"
                value={productData?.title}
                onChange={(text: string) => handleInputChange("title", text)}
                placeholder="Enter title"
                required
              />

              <MyDropdown
                label="Select Period"
                required
                data={period}
                onChange={handlePeriodChange}
              />
              <InputField
                label="Price"
                name="price"
                value={productData?.price.toString()}
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
                helperText="address should be matched with your product."
              />

              <MyDropdown
                label="Select Status"
                required
                data={status}
                onChange={handleStatusChange}
              />
              <ThemedButton
                icon="arrow-forward-outline"
                position="right"
                style={{ marginTop: 20 }}
                color={Colors.white}
                title="Next"
                onPress={() =>
                  router.push({
                    pathname: "/(listing)/add-cordinets",
                    params: { formData: JSON.stringify(productData) },
                  })
                }
              />
            </ScrollView>
          </Animated.View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "95%",
    marginVertical: 80,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: Colors.gray || "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 45,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
