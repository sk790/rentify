import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFormateDate } from "@/hooks/useFormateDate";

import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
type userProps = {
  user: User | undefined;
  me?: boolean;
};
import * as MyImagePicker from "expo-image-picker";
import { BASE_URL } from "@env";
import { User } from "@/types";
import MyModel from "./MyModel";
import { useModal } from "@/context/ModalContext";
export default function ProfileCard({ user, me }: userProps) {
  const [imageLoading, setImageLoading] = useState(false);
  const theme = useColorScheme();
  const iconTheme = theme === "light" ? "black" : "white";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { openModal } = useModal();

  const requestPermission = async () => {
    const { status } =
      await MyImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access your media library."
      );
      return false;
    }
    return true;
  };

  const uploadAvatar = async (userId: string) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    let result = await MyImagePicker.launchImageLibraryAsync({
      mediaTypes: MyImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Allow multiple selection
      quality: 1,
      allowsEditing: true,
      selectionLimit: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      try {
        setImageLoading(true);
        const res = await fetch(`${BASE_URL}/api/auth/avatar`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar: imageUri }),
        });
        setImageLoading(false);
        console.log({ res });

        const data = await res.json();
        if (res.ok) {
          setProfileImage(imageUri);
        }
      } catch (error) {
        setImageLoading(false);
        console.log(error);
      }
    } else {
      Alert.alert("No images selected", "Please select at least one image.");
    }
    console.log("upload avatar");
  };

  return (
    <ThemedView
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      style={{
        flexDirection: "column",
        padding: 10,
        borderRadius: 10,
        gap: 10,
      }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedView
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <ThemedView>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : imageLoading ? (
              <ActivityIndicator size="large" color={Colors.tomato} />
            ) : (
              <Image
                source={{
                  uri: user?.avatar,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}
            <Ionicons
              onPress={() => uploadAvatar(user?._id as string)}
              name="camera"
              size={30}
              color={Colors.tomato}
              style={{ position: "absolute", top: 50, left: 80 }}
            />
          </ThemedView>
          <ThemedText type="subtitle">{user?.name}</ThemedText>
        </ThemedView>
        {me ? (
          <Ionicons
            onPress={openModal}
            name="pencil-sharp"
            size={24}
            color={iconTheme}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <ThemedButton
            title="Call"
            color="white"
            icon="call-outline"
            style={{ width: "30%" }}
            variant="default"
          />
        )}
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="calendar" size={24} color={Colors.tomato} />
        <ThemedText type="defaultSemiBold">
          Member since {useFormateDate(user?.createdAt)}
        </ThemedText>
        {/* <MyButton color="white" bgColor="gray" label="Edit" /> */}
      </ThemedView>

      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="mail" size={24} color={Colors.tomato} />
        <ThemedText>{user?.description || "About You"}</ThemedText>
      </ThemedView>

      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="location-outline" size={24} color={Colors.tomato} />
        <ThemedText>{user?.address || "address"}</ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons
          name="phone-portrait-outline"
          size={24}
          color={Colors.tomato}
        />
        <ThemedText type="defaultSemiBold">{user?.phone}</ThemedText>
      </ThemedView>

      <ThemedView style={{ flexDirection: "row", width: "100%" }}>
        <ThemedText>User verifyed </ThemedText>
        <Ionicons name="checkmark-circle" size={24} color="green" />
      </ThemedView>
      {user && <MyModel userData={user} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
