import { router } from "expo-router";
import { useState } from "react";

export function useLogin() {
  const [email, setEmail] = useState("gabo@test.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (email !== "gabo@test.com" || password !== "1234") {
      setError("Email o contraseña incorrectos");
      return;
    }

    setError("");

    router.replace("/(tabs)" as never);
  };

  return {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
}
