import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import HorizontalProductCard from "@/components/HorizontalProductCard";
import ProfileCard from "@/components/ProfileCard";
import { useLocalSearchParams } from "expo-router";
import { Product, User } from "@/types";
import { BASE_URL } from "@env";

export default function profile() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState<User>();
  const [userProducts, setUserProducts] = useState();
  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await fetch(`${BASE_URL}/api/auth/${userId}`);
        const data = await res.json();
        // console.log(data);
        setUser(data.user);
        setUserProducts(data.user.products);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (
    <ScrollView>
      <ProfileCard user={user} />
      <HorizontalProductCard products={userProducts} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
