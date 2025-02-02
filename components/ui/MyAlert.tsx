import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModalContext";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

type ModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};
export default function MyAlert({
  title,
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { isAlertModalVisible, closeAlertModal } = useModal();

  useEffect(() => {
    setModalVisible(isAlertModalVisible);
  }, [isAlertModalVisible]);

  return (
    <ThemedView
      style={styles.container}
      darkColor={Colors.dark.cardColor}
      lightColor={Colors.light.cardColor}
    >
      {/* Custom Confirmation Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView
            style={{
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
              width: "80%",
              borderColor: Colors.gray,
              borderWidth: 1,
            }}
            darkColor={Colors.dark.cardColor}
            lightColor={Colors.light.cardColor}
          >
            <ThemedText style={styles.modalTitle}>{title}</ThemedText>
            <ThemedText style={styles.modalMessage}>{message}</ThemedText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={onConfirm}
              >
                <ThemedText style={styles.buttonText}>Confirm</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    // backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#d9534f",
  },
  confirmButton: {
    backgroundColor: "#5cb85c",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
