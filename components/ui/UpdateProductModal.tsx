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

export default function UpdateProductModal({ product }: { product: Product }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animation value for smooth transitions
  const { closeProductModal, isProductModalVisible } = useModal();
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState<Product | undefined>({
    ...product,
  });
  useEffect(() => {
    if (isProductModalVisible) {
      setModalVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 400, // Smooth fade-in duration
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400, // Smooth fade-out duration
        useNativeDriver: true,
      }).start(() => setModalVisible(false)); // Close modal after animation ends
    }
  }, [isProductModalVisible]);

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [700, 0], // Start from bottom and slide up
  });

  const handleProductUpdate = async () => {
    try {
      //   setProductData((prev: Product) => prev);

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
              <ThemedText>Edit Product</ThemedText>
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
              />
              <InputField
                label="Title"
                name="title"
                value={productData?.title}
                onChange={(text: string) => handleInputChange("title", text)}
                placeholder="Enter title"
              />

              <ThemedButton
                color={Colors.white}
                title="Update"
                onPress={handleProductUpdate}
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
