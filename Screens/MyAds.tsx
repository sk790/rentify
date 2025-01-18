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
  console.log(favoriteProducts);

  return (
    <View style={{ marginVertical: 10 }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("myads")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "myads" && styles.activeTabText,
            ]}
          >
            My Ads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("favorite")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "favorite" && styles.activeTabText,
            ]}
          >
            Favorite
          </Text>
        </TouchableOpacity>
      </View>
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
              <Text style={styles.noProductsText}>No products.</Text>
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
            <Text style={styles.noProductsText}>No favorite products</Text>
          )
        ) : null}
      </ScrollView>
    </View>
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
