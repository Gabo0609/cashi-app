import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function useImagePicker(initialPhotoUri = "") {
  const [photoUri, setPhotoUri] = useState(initialPhotoUri);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const takePhoto = async () => {
    try {
      setLoading(true);
      setError("");

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        setError("Permiso de cámara denegado");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      setError("No se pudo tomar la foto");
    } finally {
      setLoading(false);
    }
  };

  const pickFromGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setError("Permiso de galería denegado");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      setError("No se pudo seleccionar la imagen");
    } finally {
      setLoading(false);
    }
  };

  const clearPhoto = () => {
    setPhotoUri("");
    setError("");
  };

  return {
    photoUri,
    loading,
    error,
    setPhotoUri,
    takePhoto,
    pickFromGallery,
    clearPhoto,
  };
}
