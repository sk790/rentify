import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ui/ThemedView";
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  PanResponder,
} from "react-native";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  // Function to change to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  // Function to change to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  // Swipe handling using PanResponder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      const { dx } = gestureState; // dx is the change in X direction
      if (dx > 50) {
        // Swiped right
        goToPrevious();
      } else if (dx < -50) {
        // Swiped left
        goToNext();
      }
    },
  });

  return (
    <ThemedView style={styles.container}>
      <View {...panResponder.panHandlers}>
        <Image
          source={{ uri: images[currentIndex] }}
          style={[styles.image, { width: windowWidth }]}
        />
      </View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot, // Larger dot for the current image
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        {/* Previous Button */}
        <TouchableOpacity
          onPress={goToPrevious}
          style={[
            styles.button,
            currentIndex === 0 && styles.disabledButton, // Disable style when at the first image
          ]}
          disabled={currentIndex === 0} // Disable button when at the first image
        >
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity
          onPress={goToNext}
          style={[
            styles.button,
            currentIndex === images.length - 1 && styles.disabledButton, // Disable style when at the last image
          ]}
          disabled={currentIndex === images.length - 1} // Disable button when at the last image
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    height: 300,
    resizeMode: "contain",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 10,
    borderRadius: 5,
    height: 10,
    backgroundColor: Colors.primary,
  },
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    top: "50%",
    zIndex: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: "gray", // Lighter background to indicate it's disabled
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ImageSlider;
