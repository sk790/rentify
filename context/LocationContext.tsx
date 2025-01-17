import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import * as Locationn from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Location type
export interface Location {
  latitude: number;
  longitude: number;
}

// Define the Context type
interface LocationContextType {
  location: Location; // Holds the user's current location
  fetchLocation: () => Promise<void>; // Function to fetch and update the location
}

// Create the Location Context
export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Location Provider
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  // Function to fetch location
  const fetchLocation = async () => {
    try {
      const { status } = await Locationn.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const loc = await Locationn.getCurrentPositionAsync({});
      const newLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      // Update location state and persist it
      setLocation(newLocation);
      await AsyncStorage.setItem("user_location", JSON.stringify(newLocation));
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Load location from AsyncStorage when the component mounts
  useEffect(() => {
    const loadLocation = async () => {
      const storedLocation = await AsyncStorage.getItem("user_location");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      }
    };

    loadLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, fetchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom Hook to use the Location Context
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
