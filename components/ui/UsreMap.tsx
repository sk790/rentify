import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/defaultComponents/ThemedView";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  cordinets: { latitude: number; longitude: number };
};

const UserMap = ({ cordinets }: Props) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (cordinets?.latitude !== 0 && cordinets?.longitude !== 0) {
      setLocation(cordinets); // Set valid coordinates
      setLoading(false);
    }
  }, [cordinets]);

  if (loading || !location) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01, // Smaller values zoom in closer
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false} // Disable dragging
          rotateEnabled={false} // Disable rotation
          zoomEnabled={false} // Disable zoom
          pitchEnabled={false} // Disable tilt
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor="red"
            title="Your Location"
            description="You are here"
          />
        </MapView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 10,
    paddingBottom: 50,
    borderWidth: 1,
    borderColor: Colors.tomato,
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserMap;
