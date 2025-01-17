import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import HorizontalProductCard from "@/components/HorizontalProductCard";
import ProfileCard from "@/components/ProfileCard";
import { useLocalSearchParams } from "expo-router";
import { Product, User } from "@/types";
import { useProducts } from "@/context/ProductContext";

export default function profile() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userProducts, setUserProducts] = useState<Product[] | undefined>([]);
  const { products } = useProducts();
  useEffect(() => {
    const userProducts = products.filter((p) => p.user._id === userId);
    const user = products.find((p) => p.user._id.toString() === userId);
    setUser(user?.user);
    setUserProducts(userProducts);
  }, [userId]);

  return (
    <ScrollView>
      <ProfileCard user={user} />
      <HorizontalProductCard products={userProducts} />
    </ScrollView>
  );
}
