import { useState, useEffect } from "react";
import { Location } from "@/types";

const useGetDistance = (coord1: Location, coord2: Location) => {
  const [distance, setDistance] = useState<number | null>(null);

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  useEffect(() => {
    if (!coord1 || !coord2) {
      setDistance(null);
      return;
    }

    const calculateDistance = () => {
      const earthRadiusKm = 6371; // Radius of Earth in kilometers
      const lat1 = toRadians(coord1.latitude);
      const lon1 = toRadians(coord1.longitude);
      const lat2 = toRadians(coord2.latitude);
      const lon2 = toRadians(coord2.longitude);

      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = earthRadiusKm * c; // Distance in kilometers

      return distanceKm;
    };

    const result = calculateDistance();
    setDistance(result);
  }, [coord1, coord2]);

  return distance; // The calculated distance in kilometers
};

export default useGetDistance;
