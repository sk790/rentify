import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { router, Stack } from "expo-router";
import { User } from "@/types";
import { useChat } from "@/context/ChatContext";
import { getConverstions } from "@/actions";
export default function Convarsations() {
  const { setAllConversations, allConversations } = useChat();
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await getConverstions();
      if (res?.ok) {
        const data = await res.json();
        setAllConversations(data);
      }
    };
    fetchConversations();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Conversations" }} />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent:
              allConversations.length === 0 ? "center" : "flex-start",
          }}
        >
          {allConversations?.map((user: any) => (
            <TouchableOpacity
              key={user._id}
              onPress={() =>
                router.push({
                  pathname: "/userChat",
                  params: {
                    chatUser: JSON.stringify(user),
                  },
                })
              }
            >
              <ThemedView
                style={{
                  padding: 10,
                  flexDirection: "column",
                  marginHorizontal: 5,
                }}
              >
                <ChatCard user={user} />
              </ThemedView>
            </TouchableOpacity>
          ))}
          {allConversations.length === 0 && (
            <ThemedText
              style={{
                textAlign: "center",
              }}
            >
              No conversations
            </ThemedText>
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const ChatCard = ({ user }: { user: User }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Image
        source={{
          uri: user.avatar,
        }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
      <View style={{ gap: 0, flex: 1 }}>
        <ThemedText>{user.name}</ThemedText>
        <ThemedText style={{ fontSize: 12 }}>last message</ThemedText>
      </View>
      <ThemedText style={{ fontSize: 12 }}>yesterday</ThemedText>
    </View>
  );
};
