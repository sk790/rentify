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
// import { BASE_URL } from "@env";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AuthInput from "@/components/ui/AuthInput";
import { ThemedText } from "@/components/ui/ThemedText";
import { login } from "@/actions";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.phone || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await login(formData.phone, formData.password);
      setIsLoading(false);
      const data = await res?.json();
      alert(data.msg);
      if (res?.ok) {
        await AsyncStorage.setItem("token", data.token);
        setAuth(true);
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
          headerTitle: () => (
            <ThemedText
              style={{
                fontSize: 18,
                color: Colors.white,
                fontWeight: "600",
              }}
            >
              Login
            </ThemedText>
          ),
          headerLeft: () => (
            <Ionicons
              style={{ marginLeft: 20, paddingRight: 10 }}
              name="arrow-back"
              size={24}
              color={Colors.white}
              onPress={() => navigation.goBack()}
            />
          ),
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
            <View style={{ width: "100%", gap: 40 }}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 38,
                    color: Colors.white,
                    fontWeight: "600",
                  }}
                >
                  Welcome Back
                </Text>
                <Text
                  style={{
                    color: "#ffdd00",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Login to your account
                </Text>
              </View>
              <View style={{ gap: 20 }}>
                <AuthInput
                  icon="call-outline"
                  value={formData.phone}
                  onChange={(text: string) => handleInputChange("phone", text)}
                  placeholder="Phone"
                  length={10}
                  keyboardType="phone-pad"
                />
                <AuthInput
                  icon="key-outline"
                  value={formData.password}
                  secure
                  onChange={(text: string) =>
                    handleInputChange("password", text)
                  }
                  placeholder="Password"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.white,
                      fontWeight: "600",
                    }}
                  >
                    Remember me
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.white,
                      fontWeight: "600",
                    }}
                  >
                    Forgot password?
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#4c669f",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 60,
                }}
                onPress={handleSubmit}
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
                    "Login"
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
