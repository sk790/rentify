import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useGetLocation } from "@/hooks/GetLocation";
import { ThemedButton } from "@/components/ui/ThemedButton";
import ParallaxScrollView from "@/components/ui/ParallaxScrollView";
import ImagePicker from "@/components/ui/ImagePicker";

export default function addcordinets() {
  const { formData } = useLocalSearchParams();
  const data = JSON.parse(formData as string);
  console.log(data.cordinets, "data");

  const { fetchLocation, location } = useGetLocation();
  const [btnStyle, setBtnStyle] = useState("");
  const [locationBtnLoading, setLocationBtnLoading] = useState(false);

  useEffect(() => {
    data.cordinets.latitude = location.latitude;
    data.cordinets.longitude = location.longitude;
    if (data.cordinets.latitude > 0 && data.cordinets.longitude > 0) {
      setBtnStyle("green");
    } else {
      setBtnStyle(Colors.dark.cardColor);
    }
  }, [fetchLocation]);
  const getLocation = async () => {
    setLocationBtnLoading(true);
    await fetchLocation();
    setLocationBtnLoading(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add Location" }} />
      <ParallaxScrollView
        headerBackgroundColor={{
          dark: Colors.dark.background,
          light: Colors.light.background,
        }}
      >
        <ThemedButton
          icon="location"
          position="right"
          color={Colors.white}
          title={btnStyle === "green" ? "Done" : "Get Location"}
          onPress={getLocation}
          loading={locationBtnLoading}
          disabled={locationBtnLoading}
          style={{ backgroundColor: btnStyle }}
        />

        <ImagePicker formData={data} />
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
