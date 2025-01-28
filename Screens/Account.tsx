import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
import { router } from "expo-router";
import { logout } from "@/actions";

export default function Account({ navigation }: { navigation: any }) {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleLogout = async () => {
    setLoading(true);
    const res = await logout();
    setLoading(false);

    if (res?.ok) {
      await AsyncStorage.removeItem("token");
      setAuth(false);
    }
  };
  const goToFavorite = () => {
    navigation.navigate("MyAds");
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: Colors.lightTomato,
        light: Colors.lightTomato,
      }}
    >
      <>
        <ProfileCard user={user} me />
        {/* add this coponent in future */}
        {/* <ThemedButton title="Update your Kyc" color="white" /> */}
        {/* <View> */}

        <ProfileContent
          label="My Ads"
          onPress={goToFavorite}
          rightIcon="list-outline"
          leftIcon="chevron-forward"
        />

        <ProfileContent
          label="Settings"
          rightIcon="settings-outline"
          leftIcon="chevron-forward"
          onPress={() => router.push("/settings")}
        />
        <ProfileContent
          label="Notifications"
          onPress={() => router.push("/notifications")}
          rightIcon="notifications-outline"
          leftIcon="chevron-forward"
        />
        <ProfileContent
          label="Share"
          rightIcon="share-social"
          leftIcon="chevron-forward"
          isLink={true}
          onPress={() => Linking.openURL("https://play.google.com/")}
        />
        <ThemedButton
          title="Logout"
          loading={loading}
          color={Colors.white}
          onPress={handleLogout}
          style={{ marginHorizontal: 10, width: "50%" }}
          icon="log-out-outline"
        />
      </>
    </ParallaxScrollView>
  );
}

const ProfileContent = ({
  rightIcon,
  label,
  leftIcon,
  onPress,
  isLink,
}: {
  rightIcon: keyof typeof Ionicons.glyphMap;
  leftIcon: keyof typeof Ionicons.glyphMap;
  label: string;
  isLink?: boolean;
  onPress?: () => void;
}) => {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          flex: 1,
        }}
        onPress={onPress}
      >
        <Ionicons name={rightIcon} size={32} color={Colors.tomato} />
        <ThemedText type="defaultSemiBold">{label}</ThemedText>
      </TouchableOpacity>
      <Ionicons name={leftIcon} size={25} color={Colors.tomato} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({});
