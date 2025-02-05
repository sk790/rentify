import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useFormateTime } from "@/hooks/useFormateDate";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";

type Props = {
  message: {
    text: string;
    createdAt: string;
    icon?: keyof typeof Ionicons.glyphMap | "";
    postion?: string;
    me?: boolean;
    status: string;
    sender: any;
  };
};
const ChatMessage = ({ message }: Props) => {
  const { user } = useAuth();
  return (
    <ThemedView
      style={[
        styles.container,
        message.sender === user?._id
          ? styles.senderContainer
          : styles.receiverContainer,
      ]}
    >
      <ThemedView
        style={[
          styles.messageBox,
          message.sender === user?._id
            ? styles.senderMessage
            : styles.receiverMessage,
        ]}
      >
        <ThemedText style={styles.messageText}>{message.text}</ThemedText>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>
            {useFormateTime(message.createdAt)}
          </Text>
          {message.sender === user?._id && (
            <Ionicons
              name={
                message.status === "read"
                  ? "checkmark-done"
                  : message.status === "delivered"
                  ? "checkmark-done"
                  : message.status === "sent"
                  ? "checkmark"
                  : message.status === "pending"
                  ? "time-outline"
                  : "accessibility"
              }
              size={18}
              color={message.status === "read" ? Colors.primary : "gray"}
            />
          )}
        </View>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  senderContainer: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  receiverContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  messageBox: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    maxWidth: "80%",
    position: "relative",
  },
  senderMessage: {
    backgroundColor: "#005c4b", // WhatsApp green for sender
    borderTopRightRadius: 0, // Gives the chat bubble a WhatsApp-style shape
  },
  receiverMessage: {
    backgroundColor: "#202c33", // WhatsApp dark gray for receiver
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: 4,
  },
  doubleTick: {
    marginLeft: 2,
  },
});

export default ChatMessage;
