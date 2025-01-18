import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "@/components/ui/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";

export default function Account({ navigation }: { navigation: any }) {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { favoriteProducts, myAds, products } = useProducts();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleLogout = async () => {
    setAuth(false);
    await AsyncStorage.removeItem("token");
  };
  return (
    <ScrollView>
      <ProfileCard user={user} me />
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          height: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>My Ads</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="black"
            style={{ position: "absolute", right: 0 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>My Ads</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="black"
            style={{ position: "absolute", right: 0 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>My Ads</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="black"
            style={{ position: "absolute", right: 0 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Ionicons name="create-outline" size={24} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>My Ads</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="black"
            style={{ position: "absolute", right: 0 }}
          />
        </View>
        <MyButton
          label="Logout"
          bgColor={Colors.light}
          color="black"
          length="100%"
          onClick={handleLogout}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
