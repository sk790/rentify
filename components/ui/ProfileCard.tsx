import { ActivityIndicator, Alert, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFormateDateWithYear } from "@/hooks/useFormateDate";

import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";
type userProps = {
  user: User | undefined;
  me?: boolean;
};
import * as MyImagePicker from "expo-image-picker";
import { User } from "@/types";
import MyModel from "../ui/MyModel";
import { useModal } from "@/context/ModalContext";
import { updateAvatar } from "@/actions";
import { uploadToCloudinary } from "@/hooks/useUploadToCloudinary";

export default function ProfileCard({ user, me }: userProps) {
  const [imageLoading, setImageLoading] = useState(false);
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
      setImageLoading(true);
      const secure_url = await uploadToCloudinary(imageUri);
      const res = await updateAvatar(secure_url);
      setImageLoading(false);
      if (res?.ok) {
        setProfileImage(imageUri);
      }
    } else {
      Alert.alert("No images selected", "Please select at least one image.");
    }
  };

  return (
    <ThemedView
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
            gap: 5,
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
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Image
                source={{
                  uri: user?.avatar,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}
            {me && (
              <Ionicons
                onPress={() => uploadAvatar(user?._id as string)}
                name="camera"
                size={30}
                color={Colors.primary}
                style={{ position: "absolute", top: 50, left: 80 }}
              />
            )}
          </ThemedView>
          <ThemedText
            numberOfLines={2}
            type="subtitle"
            style={{ fontSize: 16 }}
          >
            {user?.name}
          </ThemedText>
        </ThemedView>
        {me ? (
          <Ionicons
            onPress={openModal}
            name="pencil-sharp"
            size={24}
            color={Colors.primary}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <ThemedButton
            title="Call"
            color={Colors.white}
            icon="call-outline"
            style={{ width: "30%" }}
            variant="default"
          />
        )}
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
        <ThemedText type="defaultSemiBold">
          Member since {useFormateDateWithYear(user?.createdAt)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="mail-outline" size={24} color={Colors.primary} />
        <ThemedText>{user?.description || "About You"}</ThemedText>
      </ThemedView>

      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="location-outline" size={24} color={Colors.primary} />
        <ThemedText>{user?.address || "address"}</ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons
          name="phone-portrait-outline"
          size={24}
          color={Colors.primary}
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
