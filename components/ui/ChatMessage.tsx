import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useFormateTime } from "@/hooks/useFormateDate";

type Props = {
  message: string;
  time: string;
  icon?: keyof typeof Ionicons.glyphMap;
  postion?: "left" | "right";
};
const ChatMessage = ({ message, time, icon, postion }: Props) => {
  return (
    <ThemedView
      style={[
        styles.container,
        postion === "left" ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      <ThemedView
        style={[
          styles.messageBox,
          postion === "left" ? styles.senderMessage : styles.receiverMessage,
        ]}
      >
        <ThemedText style={styles.messageText}>{message}</ThemedText>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>{useFormateTime(time)}</Text>

          <Icon
            name={icon || ""}
            size={16}
            color={"white"}
            style={styles.doubleTick}
          />
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
