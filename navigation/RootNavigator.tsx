import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext"; // Adjust path
import LoginScreen from "@/Screens/LoginScreen";
import HomeScreen from "@/Screens/HomeScreen";
import Chat from "@/Screens/Chat";
import MyAds from "@/Screens/MyAds";
import Account from "@/Screens/Account";
import Signup from "@/Screens/Signup";
import AuthStack from "@/Screens/AuthStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStackk() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ title: "AuthStack" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen name="SignUp" component={Signup} />
    </Stack.Navigator>
  );
}
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === "Home") {
            iconName = "home-outline"; // Ionicons name for home
          } else if (route.name === "Chat") {
            iconName = "chatbubbles-outline"; // Ionicons name for chat
          } else if (route.name === "My Ads") {
            iconName = "list-outline"; // Ionicons name for list
          } else if (route.name === "Account") {
            iconName = "person-outline"; // Ionicons name for profile
          }

          // You can return any component here (Icon, Image, etc.)
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 60 }, // Custom styling
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="My Ads" component={MyAds} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { auth } = useAuth(); // Get auth state from context

  return auth ? <AppTabs /> : <AuthStackk />;
}
