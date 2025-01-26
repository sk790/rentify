import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight } from "react-native-reanimated";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import { Colors } from "@/constants/Colors";

export default function AuthStack({ navigation }: { navigation: any }) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSign = () => {
    navigation.navigate("SignUp");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("@/assets/images/ecommerce-splash.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255, 255, 255, 1)",
              "rgba(255, 255, 255, 1)",
            ]}
            style={styles.background}
          >
            <View style={styles.wrapper}>
              <Animated.Text
                style={styles.title}
                entering={FadeInRight.delay(300).duration(300).springify()}
              >
                RENTIFY
              </Animated.Text>
              <Animated.Text
                style={styles.description}
                entering={FadeInRight.delay(500).duration(300).springify()}
              >
                Rentify is an innovative platform designed to simplify property
                rentals for both landlords and tenants. It offers a seamless and
                user-friendly experience. ease.
              </Animated.Text>
              <SocialLoginBottons navigation={navigation} />
              <View style={styles.text}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={styles.loginlink}>signin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },
  wrapper: {
    paddingBottom: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: Colors.tomato,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
    letterSpacing: 1.2,
    lineHeight: 30,
  },

  text: {
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 30,
    color: Colors.gray,
  },
  loginlink: {
    color: Colors.lightTomato,
    fontWeight: "600",
  },
});
