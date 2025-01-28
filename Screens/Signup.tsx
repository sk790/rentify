import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AuthInput from "@/components/ui/AuthInput";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function Signup({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok) {
        await AsyncStorage.setItem("token", data.token);
        setAuth(true);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#4c669f" },
        }}
      />
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 30,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View style={{ width: "100%", gap: 20 }}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 38,
                    color: Colors.white,
                    fontWeight: "600",
                  }}
                >
                  Register
                </Text>
                <Text
                  style={{ color: "#ffdd00", fontWeight: "600", fontSize: 12 }}
                >
                  Create an account
                </Text>
              </View>

              <View style={{ gap: 20 }}>
                <AuthInput
                  icon="call-outline"
                  value={formData.phone}
                  onChange={(text: string) => handleInputChange("phone", text)}
                  placeholder="Phone"
                  keyboardType="phone-pad"
                />
                <AuthInput
                  icon="key-outline"
                  value={formData.password}
                  onChange={(text: string) =>
                    handleInputChange("password", text)
                  }
                  placeholder="Password"
                />
                <AuthInput
                  icon="key-outline"
                  value={formData.confirmPassword}
                  onChange={(text: string) =>
                    handleInputChange("confirmPassword", text)
                  }
                  placeholder="Confirm Password"
                />
                <Text
                  style={{
                    color: "#4c669f",
                    fontWeight: "600",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  By registering, you agree to our terms and conditions
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#4c669f",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={handleVerifyOtp}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "600",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator size={"large"} color={"#ffdd00"} />
                  ) : (
                    "REGISTER"
                  )}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={{ borderBottomColor: "#FFD700", borderBottomWidth: 1 }}
                >
                  <Text
                    style={{
                      color: "#FFD700",
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({});
