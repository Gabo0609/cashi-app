import { useLocalSearchParams } from "expo-router";

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useCategories } from "../../../hooks/useCategories";
import { useCategoryForm } from "../../../hooks/useCategoryForm";

export default function CategoryFormScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { createCategory, updateCategory, getCategoryById } = useCategories();

  const category = id !== "new" ? getCategoryById(id) : undefined;

  const { name, errors, submitting, handleNameChange, handleSubmit } =
    useCategoryForm({
      initialName: category?.name ?? "",
      onSubmit: async (value) => {
        if (id === "new") {
          await createCategory(value);
          return;
        }

        await updateCategory(id, value);
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre de categoría</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Ej: Alimentación"
        />

        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Guardando..." : "Guardar categoría"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f5",
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d4d4d8",
  },

  error: {
    color: "#dc2626",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
