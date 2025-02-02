import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ui/ThemedView";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  coordinates: { latitude: number; longitude: number };
};

const UserMap = ({ coordinates }: Props) => {
  console.log(coordinates, "cordinets");

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (
      coordinates &&
      coordinates.latitude !== 0 &&
      coordinates.longitude !== 0
    ) {
      setLocation(coordinates);
      setLoading(false);
    }
  }, [coordinates]);
  const centralLatitude = location?.latitude;
  const centralLongitude = location?.longitude;
  const rangeInKm = 10;
  const latitudeDelta = rangeInKm / 110.574;
  const longitudeDelta =
    rangeInKm / (111.32 * Math.cos((centralLatitude! * Math.PI) / 180));

  if (loading) {
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
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922, // Use standard delta values
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            key={Math.random() * 1000}
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
            title={"Location"}
            description={"User location"}
            pinColor={Colors.primary}
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
    borderColor: Colors.primary,
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
