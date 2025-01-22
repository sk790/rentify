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
  console.log(user);
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
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <Image
          source={{ uri: user?.image }}
          style={{ width: 90, height: 90, borderRadius: 50 }}
        />
        <ThemedText type="subtitle">{user?.name}</ThemedText>
        {/* <TouchableOpacity
          style={[
            {
              padding: 10,
              borderRadius: 10,
              flex: 1,
              width: "100%",
            },
            me ? { backgroundColor: "gray" } : { backgroundColor: "green" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            {!me ? (
              <>
                <Ionicons name="call" size={24} color="white" />
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Call
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="pencil-outline" size={24} color="white" />
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Edit
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity> */}
        <ThemedButton title={me ? "Edit" : "Call"} />
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
