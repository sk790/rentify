import { Alert, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedView } from "@/components/ui/ThemedView";
import Divider from "@/components/ui/Divider";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ui/ParallaxScrollView";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function reviewProduct({ navigation }: any) {
  const { data } = useLocalSearchParams();
  const FormData = JSON.parse(data as string);
  const { formData, images: imageData } = FormData;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/product/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      setLoading(false);
      const responseData = await response.json();
      if (response.ok) {
        router.push("/");
        Alert.alert("Success", "Your data has been saved.");
      } else {
        console.error("Error saving data:", responseData);
        Alert.alert("Error", "There was an issue saving your data.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error saving data:", error);
      Alert.alert("Error", "There was an issue saving your data.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: "black", light: Colors.white }}
      >
        <ThemedView style={{ padding: 10, borderRadius: 5 }}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Category</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.category}
            </ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView>
            <ThemedText type="defaultSemiBold">Title</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.title}
            </ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView>
            <ThemedText type="defaultSemiBold">Product Name</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.productName}
            </ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView>
            <ThemedText type="defaultSemiBold">Price</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.price}
            </ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView>
            <ThemedText type="defaultSemiBold">Address</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.address}
            </ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView>
            <ThemedText type="defaultSemiBold">Period</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.period}
            </ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView>
            <ThemedText type="defaultSemiBold">Description</ThemedText>
            <ThemedText style={{ color: "tomato", fontSize: 15 }}>
              {formData.description}
            </ThemedText>
          </ThemedView>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {imageData.map((image: any, index: number) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 5,
                  backgroundColor: "#F2F2F2",
                }}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <ThemedButton
              color={Colors.white}
              title="Back"
              onPress={() => router.back()}
              icon="arrow-back"
              position="left"
              style={{ alignSelf: "center", flex: 1 }}
            />
            <ThemedButton
              color={Colors.white}
              title="Submit"
              loading={loading}
              icon="arrow-forward"
              position="right"
              onPress={handleSubmit}
              style={{ alignSelf: "center", flex: 1 }}
            />
          </View>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
