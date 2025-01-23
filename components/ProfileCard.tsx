import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFormateDate } from "@/hooks/useFormateDate";
import { Location, User } from "@/types";
import { useLocation } from "@/context/LocationContext";
import MyButton from "./ui/MyButton";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { ThemedButton } from "@/defaultComponents/ThemedButton";
type userProps = {
  user: User | undefined;
  me?: boolean;
};
export default function ProfileCard({ user, me }: userProps) {
  // console.log(user);
  const theme = useColorScheme();
  const iconTheme = theme === "light" ? "black" : "white";

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
          <Image
            source={{
              uri:
                user?.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s",
            }}
            style={{ width: 90, height: 90, borderRadius: 50 }}
          />
          <ThemedText type="subtitle">{user?.name}</ThemedText>
        </ThemedView>
        {me ? (
          <Ionicons
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
      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Ionicons name="calendar" size={24} color={iconTheme} />
        <ThemedText>Member since {useFormateDate(user?.createdAt)}</ThemedText>
        {/* <MyButton color="white" bgColor="gray" label="Edit" /> */}
      </ThemedView>

      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Ionicons name="mail" size={24} color={iconTheme} />
        <ThemedText>{user?.description || "No description"}</ThemedText>
      </ThemedView>

      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Ionicons name="location" size={24} color={iconTheme} />
        <ThemedText>{user?.address || "No address"}</ThemedText>
      </ThemedView>
      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Ionicons name="phone-portrait" size={24} color={iconTheme} />
        <ThemedText>{user?.phone}</ThemedText>
      </ThemedView>

      <ThemedView style={{ flexDirection: "row", width: "100%" }}>
        <ThemedText>User verifyed </ThemedText>
        <Ionicons name="checkmark-circle" size={24} color="green" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
