import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileCard from "@/components/ProfileCard";
import HorizontalProductCard from "@/components/HorizontalProductCard";
import { BASE_URL } from "@env";
import { Colors } from "@/constants/Colors";
import { User } from "@/types";

export default function Account({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User>();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/auth/me`);
        const data = await res.json();
        setLoading(false);
        console.log(data);

        if (res.ok) {
          setLoading(false);
          setUser(data.user);
          setProducts(data.user.products);
        }
      } catch (error) {
        setLoading(false);
        console.error("Failed to retrieve token:", error);
      }
    };
    getUser();
  }, []);
  const goToListing = () => {
    navigation.navigate("Create");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      <ProfileCard user={user} me />
      {products?.length > 0 ? (
        <HorizontalProductCard products={products} />
      ) : (
        <View
          style={{
            height: "100%",
            backgroundColor: Colors.white,
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            No Product Found
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light,
              padding: 10,
              borderRadius: 10,
              width: "50%",
              alignSelf: "center",
            }}
            onPress={goToListing}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Add Product
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
