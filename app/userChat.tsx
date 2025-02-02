import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
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
// import { useSocket } from "@/context/SocketContext";
import { useFormateTime } from "@/hooks/useFormateDate";

export default function userChat() {
  // const { onlineUsers } = useSocket();
  const { chatUser } = useLocalSearchParams();
  const parsedChatUser = JSON.parse(chatUser as string);
  const theme = useColorScheme();
  const { user: loggedInUser } = useAuth();
  const [message, setMessage] = useState<string>("");
  const { updateConversation } = useChat();

  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  // const { socket } = useSocket();
  const { user } = useAuth();

  // Function to fetch messages of a specific user
  const fetchMessages = async () => {
    const res = await getMessages({ chatUserId: parsedChatUser._id });
    const data = await res?.json();
    setMessages((prev: any) => [...prev, ...data.messages]);
  };

  const send = async () => {
    if (!message) return;
    // Create temporary message with CLIENT-generated ID
    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      _id: tempId, // Use temporary ID
      text: message,
      sender: loggedInUser?._id,
      status: "pending",
      createdAt: new Date(),
    };
    // Add only the temporary message
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
      setMessages((prev: any) =>
        prev.map((msg: any) =>
          msg._id === tempId ? { ...data.message, status: "sent" } : msg
        )
      );
      // socket.emit("sendMessage", data.message);
      // socket.emit("readMessage", data.message);
    }
  };
  // useEffect(() => {
  //   fetchMessages();
  //   // Listen for new message event
  //   socket?.on("newMessage", (msg: any) => {
  //     if (!msg) return;
  //     // Add the new message to the state
  //     setMessages((prev: any) => [
  //       ...prev,
  //       { text: msg.text, sender: msg.sender },
  //     ]);
  //   });
  //   socket?.on("messageDelivered", (message: any) => {
  //     setMessages((prev: any) =>
  //       prev.map((msg: any) =>
  //         msg._id === message._id ? { ...msg, status: "delivered" } : msg
  //       )
  //     );
  //   });
  //   return () => {
  //     socket?.off("newMessage");
  //     socket?.off("messageDelivered");
  //     socket?.off("messageReadConfirmation");
  //   };
  // }, [socket]);

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, scrollViewRef]);

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
                  borderRadius: 5,
                  width: "50%",
                  borderColor: Colors.gray,
                  borderWidth: StyleSheet.hairlineWidth,
                  alignSelf:
                    msg.sender !== loggedInUser?._id
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                <ThemedText
                  type="default"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    lineHeight: 20,
                    paddingHorizontal: 5,
                    fontSize: 14,
                  }}
                >
                  {msg.text}
                  <ThemedText
                    style={{ position: "absolute", bottom: 0, right: 0 }}
                  >
                    {msg.sender === loggedInUser?._id
                      ? msg.status === "read"
                        ? "READ"
                        : msg.status === "delivered"
                        ? "DELIVERED"
                        : msg.status === "sent"
                        ? "SENT"
                        : msg.status === "pending"
                        ? "PENDING"
                        : ""
                      : ""}
                  </ThemedText>
                  {/* <ThemedText>{useFormateTime(msg?.createdAt)}</ThemedText> */}
                </ThemedText>
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
        {loading ? (
          <ActivityIndicator color={Colors.primary} size={"large"} />
        ) : (
          <Ionicons
            name="send"
            size={28}
            color={Colors.primary}
            onPress={send}
            disabled={loading}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
