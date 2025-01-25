import {
  Alert,
  Image,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { BASE_URL } from "@env";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import { ThemedView } from "@/defaultComponents/ThemedView";
import Divider from "@/components/ui/Divider";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";

export default function reviewProduct({ navigation }: any) {
  const { data } = useLocalSearchParams();
  const FormData = JSON.parse(data as string);
  const { formData, images: imageData } = FormData;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      const responseData = await response.json();
      // console.log("Response data:", responseData);

      if (response.ok) {
        router.push("/");
        Alert.alert("Success", "Your data has been saved.");
        // router.reload();
      } else {
        console.error("Error saving data:", responseData);
        Alert.alert("Error", "There was an issue saving your data.");
      }
    } catch (error) {}
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
              margin: 10,
            }}
          >
            <ThemedButton
              title="Back"
              onPress={() => router.back()}
              icon="arrow-back"
              position="left"
              style={{ alignSelf: "center", flex: 1 }}
            />
            <ThemedButton
              title="Submit"
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
