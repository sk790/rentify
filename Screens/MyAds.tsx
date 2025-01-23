import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Product } from "@/types";
import MyAdCard from "@/components/MyAdCard";
import { useProducts } from "@/context/ProductContext";
import ParallaxScrollView from "@/defaultComponents/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/defaultComponents/ThemedView";
import { ThemedText } from "@/defaultComponents/ThemedText";
import { ThemedButton } from "@/defaultComponents/ThemedButton";

export default function MyAds({ navigation }: { navigation: any }) {
  const [selectedTab, setSelectedTab] = useState("myads");
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const { myAds, setMyAds, favoriteProducts, updateFavorite } = useProducts();
  const [onRentProducts, setOnRentProducts] = useState<Product[]>([]);

  const handleDelete = (productId: string) => {
    // Logic for real-time deletion of product
    setMyAds(myAds.filter((product: Product) => product._id !== productId));
  };

  useEffect(() => {
    setOnRentProducts(
      myAds.filter((product: Product) => product.status !== "Available")
    );
  }, []);
  const handleEdit = (product: Product) => {
    navigation.navigate("Create", { product });
  };

  const goToListing = () => {
    navigation.navigate("Create");
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);

    const toValue = tab === "myads" ? 0 : tab === "favorite" ? 1 : 2;

    Animated.timing(underlineAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const underlineTranslateX = underlineAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [15, 130, 250], // Adjust based on your tab width
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
      {/* Tabs */}
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
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("onrent")}
        >
          <ThemedText
            type="subtitle"
            style={[selectedTab === "onrent" && styles.activeTabText]}
          >
            On Rent
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      {/* Animated Underline */}
      <Animated.View
        style={[styles.underline, { left: underlineTranslateX }]}
      />
      {/* Tab Content */}
      <ScrollView style={styles.contentContainer}>
        {selectedTab === "myads" &&
          (myAds.length > 0 ? (
            myAds.map((product) => (
              <TouchableOpacity
                key={product._id}
                onPress={() => gotodetailpage(product._id)}
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
            <View style={styles.emptyState}>
              <Image
                source={{
                  uri: "https://lookshopbd.com/website/images/no_result.gif",
                }}
                style={styles.emptyImage}
              />
              <ThemedButton
                color="#333"
                title="Create New Ad"
                onPress={goToListing}
                style={styles.button}
              />
            </View>
          ))}

        {selectedTab === "favorite" &&
          (favoriteProducts.length > 0 ? (
            favoriteProducts.map((product: Product) => (
              <MyAdCard
                key={product._id}
                product={product}
                myAds={false}
                onRemoveFavorite={() => updateFavorite(product)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Image
                source={{
                  uri: "https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png?f=webp",
                }}
                style={styles.emptyImage}
              />
              <ThemedButton
                color="#333"
                title="Explore"
                onPress={() => router.replace({ pathname: "/" })}
                style={styles.button}
              />
            </View>
          ))}

        {selectedTab === "onrent" &&
          onRentProducts.map((product: Product) => (
            <MyAdCard key={product._id} product={product} myAds={true} />
          ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  activeTabText: {
    color: Colors.tomato,
    fontWeight: "bold",
  },
  underline: {
    position: "absolute",
    top: 48,
    height: 2,
    width: 100, // Matches tab width
    backgroundColor: Colors.tomato,
    borderRadius: 1,
  },
  contentContainer: {
    flex: 1,
  },
  emptyState: {
    marginTop: 50,
    alignItems: "center",
  },
  emptyImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  button: {
    width: "75%",
    alignSelf: "center",
  },
  noProductsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});
