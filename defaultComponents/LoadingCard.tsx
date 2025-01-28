import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ThemedView } from "./ThemedView";

const LoadingCard = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    // Loop animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <ThemedView style={{ flex: 1, margin: "auto" }}>
      {/* Placeholder for the card */}
      <View>
        {/* Animated Title */}
        <Animated.View style={[{ opacity }]} />

        {/* Animated Image */}
        <Animated.View style={[styles.image, { opacity }]} />

        {/* Animated Text Lines */}
        <Animated.View style={[styles.line, { opacity }]} />
        <Animated.View style={[styles.line, { opacity }]} />
        <Animated.View style={[styles.shortLine, { opacity }]} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    width: "60%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 15,
  },
  line: {
    width: "100%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
  },
  shortLine: {
    width: "50%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default LoadingCard;
