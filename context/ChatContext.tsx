import React, { createContext, useState, useContext, ReactNode } from "react";
import { Conv } from "@/types";

interface ChatContextType {
  allConversations: Conv[];
  setAllConversations: (conve: Conv[]) => void;

  updateConversation: (conv: Conv, action: "update" | "delete") => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [allConversations, setAllConversationsState] = useState<Conv[]>([]);

  const setAllConversations = (conve: Conv[]) => {
    setAllConversationsState(conve);
  };
  const updateConversation = (conv: Conv, action: "update" | "delete") => {
    switch (action) {
      case "delete":
        break;
      case "update":
        console.log(allConversations, "allConversations");

        setAllConversations(
          allConversations.map((c) => (c._id === conv._id ? conv : c))
        );
        break;
    }
  };
  return (
    <ChatContext.Provider
      value={{
        allConversations,
        setAllConversations,
        updateConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
