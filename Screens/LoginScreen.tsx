import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import LoginInputFields from "@/components/LoginInputFields";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { setAuth } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone || !password) {
      alert("Please enter phone and password");
    }
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, phone }),
      });
      const data = await res.json();

      setLoading(false);
      alert(data.msg);
      if (res.ok) {
        await AsyncStorage.setItem("token", data.token);
        setAuth(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView>
        <Stack.Screen options={{ headerTitle: "Sign In" }} />
        <View style={styles.container}>
          <Text style={styles.title}>Login to your account</Text>
          <LoginInputFields
            placeholder="Phone Number"
            placeholderTextColor={Colors.gray}
            maxLength={10}
            keyboardType="number-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <LoginInputFields
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>
          <View style={styles.text}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.loginlink}>Sign Up</Text>
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
    backgroundColor: Colors.lightGray,
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
});
