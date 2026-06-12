import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

import { API_URL } from "../constants/api";

export function useLogin() {
  const [email, setEmail] = useState("gabo2@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Email o contraseña incorrectos");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      router.replace("/(tabs)" as never);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
}
