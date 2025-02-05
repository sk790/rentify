import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import ChatHeader from "@/components/ui/ChatHeader";
import Divider from "@/components/ui/Divider";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { sendMessage, getMessages } from "@/actions";
import { useSocket } from "@/context/SocketContext";
import { useFocusEffect } from "@react-navigation/native";
import { Message } from "@/types";
import LoadingCard from "@/components/ui/LoadingCard";
import ChatMessage from "@/components/ui/ChatMessage";

export default function userChat() {
  const { socket } = useSocket();
  const { chatUser } = useLocalSearchParams();
  const parsedChatUser = JSON.parse(chatUser as string);
  const theme = useColorScheme();
  const { user: loggedInUser } = useAuth();
  const [message, setMessage] = useState<string>("");
  const { updateConversation } = useChat();
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket?.on("newMessage", (msg: any) => {
      if (!msg) return;
      setMessages((prev: any) => [
        ...prev,
        { text: msg.text, sender: msg.sender },
      ]);
      // console.log(msg.sender, msg.receiver);
      // if (msg.receiver !== loggedInUser?._id) {
      //   setMessages((prev: any) => [
      //     ...prev,
      //     { text: "bubbb", sender: msg.sender },
      //   ]);
      // }
    });
    socket?.on("messageDelivered", (message: any) => {
      setMessages((prev: any) =>
        prev.map((msg: any) =>
          msg._id === message._id ? { ...msg, status: message.status } : msg
        )
      );
    });
    return () => {
      socket?.off("newMessage");
      socket?.off("messageDelivered");
      socket?.off("messageRead");
    };
  }, [socket]);

  const send = async () => {
    if (!message) return;
    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      _id: tempId, // Use temporary ID
      text: message,
      sender: loggedInUser?._id,
      status: "pending",
      createdAt: new Date(),
    };
    setMessages((prev: any) => [...prev, newMessage]);
    setMessage("");

    // Send the message to the server
    const res = await sendMessage({
      senderId: loggedInUser?._id,
      receiverId: parsedChatUser._id,
      text: message,
    });
    updateConversation(parsedChatUser, "update");

    if (res?.ok) {
      const data = await res.json();
      // console.log(data);

      setMessages((prev: any) =>
        prev.map((msg: any) =>
          msg._id === tempId
            ? { ...data.message, status: data.message.status }
            : msg
        )
      );
      socket.emit("sendMessage", data.message);
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, scrollViewRef]);
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const res = await getMessages({ chatUserId: parsedChatUser._id });
      setLoading(false);
      const data = await res?.json();
      setMessages((prev: any) => [...prev, ...data.messages]);
    };
    fetchMessages();
  }, [chatUser]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ChatHeader user={parsedChatUser!} />,
        }}
      />
      <Divider />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <ThemedView style={{ flex: 1, marginHorizontal: 10 }}>
          <ThemedView style={{ flexDirection: "column", gap: 10 }}>
            <FlatList
              keyExtractor={(item) => item._id}
              data={messages}
              renderItem={({ item }) => <ChatMessage {...item} />}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>
      <ThemedView
        darkColor={Colors.dark.cardColor}
        lightColor={Colors.light.cardColor}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 15,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Ionicons name="attach-outline" size={28} color={Colors.primary} />
        <TextInput
          placeholderTextColor={Colors.gray}
          placeholder="Type a message"
          style={{
            backgroundColor:
              theme === "dark" ? Colors.dark.cardColor : Colors.light.cardColor,
            flex: 1,
            borderRadius: 20,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.primary,
            padding: 10,
            color: Colors.gray,
          }}
          value={message}
          onChangeText={(msg) => setMessage(msg)}
        />

        <TouchableOpacity onPress={send}>
          <Ionicons name="send" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
