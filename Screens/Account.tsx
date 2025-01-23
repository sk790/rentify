import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { BASE_URL } from "@env";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { ThemedButton } from "@/defaultComponents/ThemedButton";

export default function Account({ navigation }: { navigation: any }) {
  const theme = useColorScheme();
  const iconTheme = theme === "light" ? "black" : "white";
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { favoriteProducts, myAds, products } = useProducts();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleLogout = async () => {
    try {
      setAuth(false);
      await AsyncStorage.removeItem("token");
      const res = await fetch(`${BASE_URL}/api/auth/logout`);
      const data = await res.json();
      console.log({ data });
      if (res.ok) {
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: Colors.lightTomato,
        light: Colors.lightTomato,
      }}
    >
      <ProfileCard user={user} me />
      <ThemedView
        style={{
          alignItems: "center",
          height: "100%",
        }}
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color={iconTheme} />
          <ThemedText>My Ads</ThemedText>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color={iconTheme}
            style={{ position: "absolute", right: 0 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color={iconTheme} />
          <ThemedText>My Ads</ThemedText>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color={iconTheme}
            style={{ position: "absolute", right: 0 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color={iconTheme} />
          <ThemedText>My Ads</ThemedText>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color={iconTheme}
            style={{ position: "absolute", right: 0 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color={iconTheme} />
          <ThemedText>My Ads</ThemedText>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color={iconTheme}
            style={{ position: "absolute", right: 0 }}
          />
        </ThemedView>

        <ThemedButton
          color="white"
          title="Logout"
          onPress={handleLogout}
          style={{ width: "100%" }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
