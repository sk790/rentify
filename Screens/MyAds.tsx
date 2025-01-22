import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { Product } from "@/types";
import MyAdCard from "@/components/MyAdCard";
import { useProducts } from "@/context/ProductContext";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";

export default function MyAds({ navigation }: { navigation: any }) {
  const [selectedTab, setSelectedTab] = useState("myads");
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const { myAds, setMyAds, favoriteProducts, setFavoriteProducts } =
    useProducts();

  const handleDelete = (productId: string) => {
    //logic for real time deletion of product
    if (myAds.map((fav: Product) => fav._id === productId)) {
      setMyAds(myAds.filter((fav: Product) => fav._id !== productId));
    }
  };
  const handleRemoveFavorite = (product: Product) => {
    if (favoriteProducts.some((fav: Product) => fav._id === product._id)) {
      setFavoriteProducts(
        favoriteProducts.filter((fav: Product) => fav._id !== product._id)
      );
    } else {
      setFavoriteProducts([...favoriteProducts, { ...product }]);
    }
  };

  const handleEdit = (product: Product) => {
    navigation.navigate("Create", { product });
  };
  const goToListing = () => {
    navigation.navigate("Create");
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    Animated.timing(underlineAnim, {
      toValue: tab === "myads" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const underlinePosition = underlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"], // Position the underline under the selected tab
  });

  const gotodetailpage = (id: string) => {
    router.push({ pathname: "/productDetail", params: { productId: id } });
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: Colors.lightGray,
        light: Colors.lightGray,
      }}
    >
      <ThemedView style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("myads")}
        >
          <ThemedText
            type="subtitle"
            style={[selectedTab === "myads" && styles.activeTabText]}
          >
            My Ads
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("favorite")}
        >
          <ThemedText
            type="subtitle"
            style={[selectedTab === "favorite" && styles.activeTabText]}
          >
            Favorite
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      {/* Animated Underline */}
      <Animated.View style={[styles.underline, { left: underlinePosition }]} />
      <ScrollView style={styles.contentContainer}>
        {selectedTab === "myads" &&
          (myAds.length > 0 ? (
            myAds.map((product) => (
              <TouchableOpacity
                key={product._id}
                onPress={() => {
                  gotodetailpage(product._id);
                }}
              >
                <MyAdCard
                  key={product._id}
                  product={product}
                  onDelete={() => handleDelete(product._id)}
                  onEdit={handleEdit}
                  myAds={true}
                />
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity onPress={goToListing}>
              <ThemedText type="subtitle" style={{ textAlign: "center" }}>
                No products.
              </ThemedText>
            </TouchableOpacity>
          ))}
        {selectedTab === "favorite" ? (
          favoriteProducts.length > 0 ? (
            favoriteProducts.map((product: Product) => (
              <MyAdCard
                key={product._id}
                product={product}
                myAds={false}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))
          ) : (
            <ThemedText type="subtitle" style={{ textAlign: "center" }}>
              No favorite products
            </ThemedText>
          )
        ) : null}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    position: "relative",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "#f55",
    fontWeight: "bold",
  },
  underline: {
    position: "absolute",
    top: 48,
    height: 2,
    width: "50%", // Width of the underline matches the tab
    backgroundColor: "#f55",
    borderRadius: 1,
  },
  contentContainer: {
    // flex: 1,
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  noProductsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
