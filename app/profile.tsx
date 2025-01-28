import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import HorizontalProductCard from "@/components/HorizontalProductCard";
import ProfileCard from "@/components/ProfileCard";
import { useLocalSearchParams } from "expo-router";
import { Product, User } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

export default function profile() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userProducts, setUserProducts] = useState<Product[] | undefined>([]);
  const { allProducts } = useProducts();
  const { user: loggedInUser } = useAuth();
  // console.log({ logged: loggedInUser });

  const [me, setMe] = useState(false);
  useEffect(() => {
    const userProducts = allProducts.filter((p) => p.user._id === userId);
    const product = allProducts.find((p) => p.user._id === userId);
    // console.log({ user: user });

    setMe(product?.user._id === loggedInUser?._id);
    setUser(product?.user);
    setUserProducts(userProducts);
  }, [userId]);

  return (
    <ScrollView>
      <ProfileCard user={user} me={me} />
      {userProducts?.map((product) => (
        <HorizontalProductCard key={product._id} product={product} />
      ))}
    </ScrollView>
  );
}
