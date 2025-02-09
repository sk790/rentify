import {
  ScrollView,
  StyleSheet,
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
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { sendMessage, getMessages } from "@/actions";
import { useSocket } from "@/context/SocketContext";

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
  const [msgToSendSender, setMsgToSendSender] = useState<any>(null);

  useEffect(() => {
    socket?.on("newMessage", (msg: any) => {
      if (!msg) return;
      if (msg.sender === loggedInUser?._id) {
        setMsgToSendSender(msg);
        return;
      }
      setMessages((prev: any) => [
        ...prev,
        { text: msg.text, sender: msg.sender },
      ]);
      setMsgToSendSender(msg);
    });
    if (msgToSendSender?.status === "delivered") {
      socket?.emit("messageRead", msgToSendSender);
    }

    socket?.on("messageDelivered", (message: any) => {
      setMessages((prev: any) =>
        prev.map((msg: any) =>
          msg._id === message._id ? { ...msg, status: message.status } : msg
        )
      );
    });
    socket?.on("messageReadConfirm", (message: any) => {
      if (message.status === "read") {
        console.log(message, "message");
        setMessages((prev: any) =>
          prev.map((msg: any) =>
            msg._id === message._id ? { ...msg, status: message.status } : msg
          )
        );
      }
    });
    return () => {
      socket?.off("newMessage");
      socket?.off("messageReadConfirm");
      socket?.off("messageDelivered");
    };
  }, [socket, msgToSendSender]);

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
            {messages.map((msg: any, index: number) => (
              <ThemedView
                key={index}
                darkColor={Colors.dark.cardColor}
                lightColor={Colors.light.cardColor}
                style={{
                  alignSelf:
                    msg.sender !== loggedInUser?._id
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                <ChatMessage message={msg} />
              </ThemedView>
            ))}
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
