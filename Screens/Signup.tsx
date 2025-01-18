import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import LoginInputFields from "@/components/LoginInputFields";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export default function Signup({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
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
  const handleOtp = async () => {};
  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      return alert("Please enter 4 digit otp");
    }
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
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <ScrollView>
        <Stack.Screen options={{ headerTitle: "Sign Up" }} />
        <View style={styles.container}>
          <Text style={styles.title}>Create an accont</Text>

          <LoginInputFields
            placeholder={"Phone Number"}
            placeholderTextColor={Colors.gray}
            value={formData.phone}
            keyboardType="number-pad"
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          <LoginInputFields
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            autoCapitalize="none"
            value={formData.password}
            secureTextEntry={true}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <LoginInputFields
            placeholder="confirm Password"
            placeholderTextColor={Colors.gray}
            keyboardType="number-pad"
            value={formData.confirmPassword}
            secureTextEntry={true}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
          />
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                paddingHorizontal: 12,
              }}
              placeholder="OTP"
              placeholderTextColor={Colors.gray}
              maxLength={4}
              keyboardType="number-pad"
              value={otp}
              onChangeText={(value) => setOtp(value)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "gray",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: "center",
                paddingHorizontal: 2,
              }}
              onPress={handleOtp}
              disabled={isOtpSent}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                {isOtpSent ? "Resend" : "Get Otp"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleVerifyOtp}>
            <Text style={styles.btnText}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                "Sign Up"
              )}
              SignUp
            </Text>
          </TouchableOpacity>
          <View style={styles.text}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginlink}>signin</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <SocialLoginBottons navigation={navigation} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btnText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 30,
    color: Colors.gray,
  },
  loginlink: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
