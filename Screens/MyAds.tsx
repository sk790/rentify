import React, { useRef, useState } from "react";
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
import { useModal } from "@/context/ModalContext";
import EmptyPage from "@/components/ui/EmptyPage";

export default function MyAds({ navigation }: { navigation: any }) {
  const { openModal } = useModal();
  const [selectedTab, setSelectedTab] = useState("myads");
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const { myAdsProducts, favoriteProducts, myProductsOnRent, updateProduct } =
    useProducts();

  // console.log(myProductsOnRent, "myProductsOnRent");

  const handleDelete = (product: Product) => {
    // Logic for real-time deletion of product
    updateProduct(product, "delete");
  };

  const handleEdit = (product: Product) => {
    openModal();
  };

  const goToListing = () => {
    navigation.navigate("Create");
  };

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

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
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
          (myAdsProducts.length > 0 ? (
            myAdsProducts.map((product) => (
              <MyAdCard
                key={product._id}
                product={product}
                onDelete={() => handleDelete(product)}
                onEdit={() => handleEdit(product)}
                myAds={true}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <EmptyPage msg="You have no ads" />
              <ThemedButton
                color={Colors.white}
                icon="create-outline"
                position="right"
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
                onRemoveFavorite={() =>
                  updateProduct(product, "toggleFavorite")
                }
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
                color={Colors.white}
                icon="expand-outline"
                position="right"
                title="Explore"
                onPress={() => router.replace({ pathname: "/" })}
                style={styles.button}
              />
            </View>
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
            <View style={styles.emptyState}>
              <Image
                source={{
                  uri: "https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png?f=webp",
                }}
                style={styles.emptyImage}
              />
              <ThemedButton
                color={Colors.white}
                icon="expand-outline"
                title="Explore"
                onPress={() => router.replace({ pathname: "/" })}
                style={styles.button}
                position="right"
              />
            </View>
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
    zIndex: 10,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  underline: {
    zIndex: 0,
    position: "absolute",
    top: 18,
    borderRadius: 10,
    height: 35,
    width: 120, // Matches tab width
    backgroundColor: Colors.tomato,
  },
  contentContainer: {
    flex: 1,
    marginTop: "20%",
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
