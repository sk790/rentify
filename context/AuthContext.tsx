import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AuthContextType {
  auth: boolean; // Represents if the user is authenticated
  setAuth: (authState: boolean) => void; // Updates the authentication state
  user: User | undefined;
  setUser: (user: User, action: "update" | "setUser") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false); // Default authentication state is false
  const [user, setUserState] = useState<User | undefined>(undefined);

  const setUser = (newUser: User, action: "update" | "setUser") => {
    if (action === "update") {
      setUserState({ ...user, ...newUser });
    } else {
      setUserState(newUser);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setAuth(!!token); // Set auth to true if token exists, false otherwise
      } catch (error) {
        console.error("Failed to retrieve token:", error);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
