import { useState } from "react";
import * as Location from "expo-location";

export const useGetLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      // AsyncStorage.setItem("user_location", JSON.stringify(loc.coords));
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return { location, fetchLocation };
};
