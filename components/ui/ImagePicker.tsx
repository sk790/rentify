// import { BASE_URL, CLOUD_NAME, UPLOAD_PRESET } from "@env";
import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as MyImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { uploadToCloudinary } from "@/hooks/useUploadToCloudinary";
import { Colors } from "@/constants/Colors";

const ImagePicker = (formData: any) => {
  const [imageUris, setImageUris] = useState<string[]>([]); // Store URIs of selected images
  const [loading, setLoading] = useState(false);
  // console.log(formData);

  // Request permission to access media library
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

  // Pick multiple images from the device
  const pickImages = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await MyImagePicker.launchImageLibraryAsync({
      mediaTypes: MyImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);

      // Limit the number of selected images
      const maxImages = 4; // Set your desired limit here
      if (selectedImages.length > maxImages) {
        Alert.alert(
          "Selection Limit Exceeded",
          `You can select a maximum of ${maxImages} images.`
        );
        setImageUris(selectedImages.slice(0, maxImages)); // Store only up to the limit
      } else {
        setImageUris(selectedImages); // Store all selected images
      }
    } else {
      Alert.alert("No images selected", "Please select at least one image.");
    }
  };

  // Upload each selected image to Cloudinary

  // Upload all selected images and send form data to the backend
  const uploadImages = async () => {
    if (imageUris.length === 0) {
      Alert.alert("No images", "Please select images to upload.");
      return;
    }

    // Upload images and collect their secure URLs
    const uploadedUrls = [];
    for (let uri of imageUris) {
      setLoading(true);
      const secureUrl = await uploadToCloudinary(uri);
      if (secureUrl) {
        uploadedUrls.push(secureUrl);
      }
    }
    setLoading(false);

    // Now, send the form data along with the image URLs to the database
    const dataToSend = {
      ...formData,
      images: uploadedUrls, // Attach the uploaded image URLs
    };
    // console.log({ dataToSend });

    router.push({
      pathname: "/(listing)/reviewProduct",
      params: { data: JSON.stringify(dataToSend) },
    });
  };

  return (
    <ScrollView>
      <ThemedView
        style={styles.container}
        darkColor={Colors.dark.cardColor}
        lightColor={Colors.light.cardColor}
      >
        <ThemedView
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={pickImages}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/007/567/154/non_2x/select-image-icon-vector.jpg",
              }}
              style={{ width: 150, height: 150 }}
            />
          </TouchableOpacity>

          {imageUris.length > 0 && (
            <>
              {imageUris.map((uri, index) => (
                <View key={index}>
                  <Image source={{ uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => {
                      // Remove the selected image
                      setImageUris(imageUris.filter((_, i) => i !== index));
                    }}
                  >
                    <Ionicons name="close-outline" size={40} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <ThemedButton
            color={Colors.white}
            title="Edit"
            onPress={() => router.back()}
            style={{ marginTop: 10, flex: 1 }}
            icon="arrow-back"
            position="left"
          />
          <ThemedButton
            color={Colors.white}
            title={loading ? "Uploading..." : "Upload"}
            icon="arrow-forward"
            position="right"
            onPress={uploadImages}
            loading={loading}
            disabled={
              loading ||
              imageUris.length === 0 ||
              formData.formData.cordinets.latitude === 0
            }
            style={{ marginTop: 10, flex: 1 }}
          />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    // backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
});

export default ImagePicker;
