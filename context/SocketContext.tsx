import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { Socket } from "socket.io-client";

interface SocketContextType {
  onlineUsers: string[];
  socket: any;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsersState] = useState<string[]>([]);
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    if (!user?._id) return;
    const socketInstance = io(`${BASE_URL}`, {
      transports: ["polling"], // Ensures WebSocket is used instead of polling
      reconnection: true, // Enables automatic reconnection
      reconnectionAttempts: 5, // Retry up to 5 times
      timeout: 10000, // Connection timeout (10s)
      query: { userId: user._id },
    });
    socketInstance.on("connect", () => {
      console.log("Connected to socket server with id:", socketInstance.id);
    });

    setSocket(socketInstance);
    socketInstance.on("getOnlineUsers", (users: any) => {
      console.log(users, "users");
      setOnlineUsersState(users);
    });
    socketInstance.on("connect_error", (error: any) => {
      console.log("Socket connection error:", error);
    });
    return () => {
      socketInstance.disconnect(); // Cleanup function
      setSocket(null); // Reset state on unmount
    };
  }, [user?._id]);
  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
