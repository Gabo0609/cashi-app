import { useLocalSearchParams } from "expo-router";

import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useCategories } from "../../../hooks/useCategories";
import { useTransactionForm } from "../../../hooks/useTransactionForm";
import { useTransactions } from "../../../hooks/useTransactions";

export default function TransactionFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { categories } = useCategories();

  const { createTransaction, updateTransaction, getTransactionById } =
    useTransactions();

  const transaction = id !== "new" ? getTransactionById(id) : undefined;

  const {
    amount,
    type,
    description,
    categoryId,
    errors,
    submitting,
    handleAmountChange,
    handleTypeChange,
    handleDescriptionChange,
    handleCategoryChange,
    handleSubmit,
  } = useTransactionForm({
    initialValues: transaction
      ? {
          amount: transaction.amount,
          type: transaction.type,
          description: transaction.description,
          categoryId: transaction.categoryId,
        }
      : undefined,
    onSubmit: async (data) => {
      if (id === "new") {
        await createTransaction(data);
        return;
      }

      await updateTransaction(id, data);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="Ej: 15000"
            keyboardType="numeric"
          />
          {errors.amount ? (
            <Text style={styles.error}>{errors.amount}</Text>
          ) : null}

          <Text style={styles.label}>Tipo</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                type === "income" && styles.selectedButton,
              ]}
              onPress={() => handleTypeChange("income")}
            >
              <Text style={styles.optionText}>Ingreso</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                type === "expense" && styles.selectedButton,
              ]}
              onPress={() => handleTypeChange("expense")}
            >
              <Text style={styles.optionText}>Egreso</Text>
            </TouchableOpacity>
          </View>
          {errors.type ? <Text style={styles.error}>{errors.type}</Text> : null}

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Ej: Supermercado"
          />
          {errors.description ? (
            <Text style={styles.error}>{errors.description}</Text>
          ) : null}

          <Text style={styles.label}>Categoría</Text>

          {categories.length === 0 ? (
            <Text style={styles.emptyText}>
              Primero debes crear una categoría.
            </Text>
          ) : (
            categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  categoryId === category.id && styles.selectedButton,
                ]}
                onPress={() => handleCategoryChange(category.id)}
              >
                <Text style={styles.optionText}>{category.name}</Text>
              </TouchableOpacity>
            ))
          )}

          {errors.categoryId ? (
            <Text style={styles.error}>{errors.categoryId}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={styles.buttonText}>
              {submitting ? "Guardando..." : "Guardar transacción"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    gap: 12,
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
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#71717a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#71717a",
    padding: 14,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: "#2563eb",
  },
  optionText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    color: "#52525b",
  },
  error: {
    color: "#dc2626",
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
