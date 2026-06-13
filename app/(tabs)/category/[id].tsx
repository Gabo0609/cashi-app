import { Stack, useLocalSearchParams } from "expo-router";

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useCategories } from "../../../hooks/useCategories";
import { useCategoryForm } from "../../../hooks/useCategoryForm";

export default function CategoryFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { createCategory, updateCategory, getCategoryById } = useCategories();

  const category = id !== "new" ? getCategoryById(id) : undefined;

  const { name, errors, submitting, handleNameChange, handleSubmit } =
    useCategoryForm({
      initialName: category?.name ?? "",
      onSubmit: async (name) => {
        if (id === "new") {
          await createCategory(name);
          return;
        }

        await updateCategory(id, name);
      },
    });

  return (
    <>
      <Stack.Screen
        options={{
          title: id === "new" ? "Nueva categoría" : "Editar categoría",
        }}
      />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.form}>
            <Text style={styles.label}>Nombre de categoría</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={handleNameChange}
              placeholder="Ej: Alimentación"
              placeholderTextColor="#71717a"
            />

            {errors.name ? (
              <Text style={styles.error}>{errors.name}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.button, submitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.buttonText}>
                {submitting ? "Guardando..." : "Guardar categoría"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  keyboard: {
    flex: 1,
  },
  form: {
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#18181b",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d4d4d8",
    color: "#18181b",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "#dc2626",
  },
});
