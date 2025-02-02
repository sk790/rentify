import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Divider from "./Divider";
import { User } from "@/types";
import { router } from "expo-router";
import { useSocket } from "@/context/SocketContext";

export default function ChatHeader({ user }: { user: User }) {
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(user._id);
  const inset = useSafeAreaInsets();
  return (
    <>
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: inset.top + 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.primary}
            onPress={() => router.back()}
          />
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/profile",
                params: { userId: user._id },
              })
            }
          >
            <Image
              source={{ uri: user?.avatar }}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
          </TouchableOpacity>
          <View>
            <ThemedText type="defaultSemiBold">{user?.name}</ThemedText>
            <ThemedText
              type="default"
              style={[
                { fontSize: 12, color: isOnline ? "green" : Colors.gray },
              ]}
            >
              {isOnline ? "Online" : "Offline"}
            </ThemedText>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.primary} />
        </View>
      </ThemedView>
      {/* <Divider /> */}
    </>
  );
}

const styles = StyleSheet.create({});
