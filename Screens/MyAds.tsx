import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router, Stack } from "expo-router";
import { Product } from "@/types";
import MyAdCard from "@/components/ui/MyAdCard";
import { useProducts } from "@/context/ProductContext";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { useModal } from "@/context/ModalContext";
import EmptyPage from "@/components/ui/EmptyPage";
import LoadingCard from "@/components/ui/LoadingCard";

export default function MyAds({ navigation }: { navigation: any }) {
  const { openModal } = useModal();
  const [selectedTab, setSelectedTab] = useState("myads");
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const { myAdsProducts, favoriteProducts, myProductsOnRent, updateProduct } =
    useProducts();
  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    const toValue = tab === "myads" ? 0 : tab === "favorite" ? 1 : 2;
    Animated.timing(underlineAnim, {
      toValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const underlineTranslateX = underlineAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [5, 120, 235], // Adjust based on your tab width
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "My Ads", headerShown: true }} />
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1, // This makes the content expand to full height
          paddingBottom: 20, // Add some bottom padding if needed
        }}
      >
        <ThemedView>
          {selectedTab === "myads" &&
            (myAdsProducts.length > 0 ? (
              myAdsProducts.map((product) => (
                <MyAdCard
                  key={product._id}
                  product={product}
                  onDelete={() => updateProduct(product, "delete")}
                  onEdit={() => openModal()}
                  myAds={true}
                />
              ))
            ) : (
              <EmptyPage
                msg="You have no ads"
                btnText="Create"
                onClick={() => navigation.navigate("Create")}
              />
            ))}
          {selectedTab === "favorite" &&
            (favoriteProducts.length > 0 ? (
              favoriteProducts.map((product) => (
                <MyAdCard
                  key={product._id}
                  product={product}
                  myAds={false}
                  onRemoveFavorite={() =>
                    updateProduct(product, "toggleFavorite")
                  }
                />
              ))
            ) : (
              <EmptyPage
                msg="You have no favorite ads"
                btnText="Explore"
                onClick={() => router.push("/categrisProducts")}
              />
            ))}
          {selectedTab === "onrent" &&
            (myProductsOnRent.length > 0 ? (
              myProductsOnRent.map((product: Product) => (
                <MyAdCard
                  key={product._id}
                  product={product}
                  myAds={true}
                  onRemoveFavorite={() =>
                    updateProduct(product, "toggleFavorite")
                  }
                />
              ))
            ) : (
              <>
                <EmptyPage
                  msg="You have no products on rent"
                  btnText="Create"
                  onClick={() => navigation.navigate("Create")}
                />
              </>
            ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    zIndex: 10,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  underline: {
    zIndex: 0,
    position: "absolute",
    top: 9,
    borderRadius: 5,
    height: 35,
    width: 120, // Matches tab width
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    flex: 1,
    minHeight: "100%", // Ensure content takes full height

    // justifyContent:
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
    marginTop: 10,
  },
  noProductsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});
