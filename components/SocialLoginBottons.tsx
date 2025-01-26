import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
// import  Google  from "@/assets/images/google-logo.svg";
type Props = {
  navigation: any;
};

const SocialLoginBottons = (props: Props) => {
  const handleSignUp = () => {
    props.navigation.navigate("SignUp");
  };
  return (
    <View style={styles.socialLogin}>
      <Animated.View entering={FadeInLeft.delay(700).duration(300).springify()}>
        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Ionicons
            name="phone-portrait-outline"
            size={20}
            color={Colors.tomato}
          />
          <Text style={styles.btnText}>Continue with Mobile</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInRight.delay(900).duration(300).springify()}
      >
        <TouchableOpacity style={styles.btn}>
          {/* <Google width={20} height={20} /> */}
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInLeft.delay(1100).duration(300).springify()}
      >
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="logo-apple" size={20} color={Colors.tomato} />
          <Text style={styles.btnText}>Continue with Apple</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SocialLoginBottons;

const styles = StyleSheet.create({
  socialLogin: {
    alignSelf: "stretch",
  },
  btnText: {
    flexDirection: "row",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: Colors.tomato,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 15,
  },
});
