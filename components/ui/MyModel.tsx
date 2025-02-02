import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Animated,
  ScrollView,
  Alert,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors"; // Add your colors or use default values
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ui/ThemedView";
import { useModal } from "@/context/ModalContext";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { User } from "@/types";
import { ThemedText } from "@/components/ui/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/actions";

export default function MyModel({ userData }: { userData?: User }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animation value for smooth transitions
  const { isModalVisible, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const theme = useColorScheme();
  const bg = theme === "dark" ? Colors.black : Colors.white;

  const [profileData, setProfileData] = useState<User | undefined>({
    ...userData!,
  });

  useEffect(() => {
    if (isModalVisible) {
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
  }, [isModalVisible]);

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [700, 0], // Start from bottom and slide up
  });

  const handleProfileUpdate = async () => {
    try {
      if (
        !profileData?.name &&
        !profileData?.description &&
        !profileData?.address
      ) {
        return Alert.alert("Error", "Please fill at least one of the fields.");
      }
      setLoading(true);
      const res = await updateProfile(profileData);
      setLoading(false);
      if (res?.ok) {
        Alert.alert("Success", "Profile updated successfully.");
        setUser(profileData, "update");
      }
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade" // We'll handle animation ourselves
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: modalTranslateY }],
                backgroundColor: bg,
                borderColor: Colors.gray,
                borderWidth: StyleSheet.hairlineWidth,
              },
            ]}
          >
            {/* Modal Content */}
            <ThemedView
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ThemedText style={styles.modalTitle}>Edit Profile</ThemedText>
              <Ionicons
                onPress={closeModal}
                name="close"
                size={38}
                color={Colors.primary}
              />
            </ThemedView>
            <ScrollView>
              <TextInput
                // placeholderTextColor={Colors.white}
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === "dark" ? Colors.gray : Colors.white,
                    color: theme === "dark" ? Colors.white : Colors.black,
                  },
                ]}
                placeholder="Enter Your Name"
                value={profileData?.name}
                onChangeText={(text) =>
                  setProfileData({ ...profileData!, name: text })
                }
              />
              <TextInput
                // placeholderTextColor={Colors.black}
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === "dark" ? Colors.gray : Colors.white,
                    color: theme === "dark" ? Colors.white : Colors.black,
                  },
                ]}
                placeholder="Enter Your Description"
                value={profileData?.description}
                onChangeText={(text) =>
                  setProfileData({ ...profileData!, description: text })
                }
              />
              <TextInput
                // placeholderTextColor={Colors.white}
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === "dark" ? Colors.gray : Colors.white,
                    color: theme === "dark" ? Colors.white : Colors.black,
                  },
                ]}
                placeholder="Enter Your Address"
                value={profileData?.address}
                onChangeText={(text) =>
                  setProfileData({ ...profileData!, address: text })
                }
              />
            </ScrollView>
            <ThemedButton
              title="Update"
              color="#fff"
              loading={loading}
              onPress={handleProfileUpdate}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,

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
