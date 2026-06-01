import * as Location from "expo-location";
import { useState } from "react";

import type { TransactionLocation } from "../types/transaction";

export function useLocation(initialLocation?: TransactionLocation) {
  const [location, setLocation] = useState<TransactionLocation | undefined>(
    initialLocation,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const permission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        setError("Permiso de ubicación denegado");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      const nextLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(nextLocation);
      return nextLocation;
    } catch {
      setError("No se pudo obtener la ubicación");
    } finally {
      setLoading(false);
    }
  };

  const clearLocation = () => {
    setLocation(undefined);
    setError("");
  };

  return {
    location,
    loading,
    error,
    setLocation,
    getCurrentLocation,
    clearLocation,
  };
}
