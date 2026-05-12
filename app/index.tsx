import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLogin } from "../hooks/useLogin";

export default function LoginScreen() {
  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={24}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Cashi</Text>

          <Text style={styles.subtitle}>Controla tus finanzas personales</Text>

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#71717a"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#71717a"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.hint}>Usuario: gabo@test.com</Text>
          <Text style={styles.hint}>Clave: 1234</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#18181b",
  },
  subtitle: {
    fontSize: 16,
    color: "#52525b",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderColor: "#d4d4d8",
    color: "#18181b",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#dc2626",
    marginTop: 12,
  },
  hint: {
    color: "#71717a",
    marginTop: 8,
    fontSize: 12,
  },
});
