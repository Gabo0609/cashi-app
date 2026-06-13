import { router } from "expo-router";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { apiRequest } from "../lib/api";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export function useLogin() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Ingresa tu correo y contraseña");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: {
          email: cleanEmail,
          password,
        },
      });

      await login(data.token);

      router.replace("/(tabs)" as never);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión");
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
