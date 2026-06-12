import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";

import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCategories } from "../../hooks/useCategories";
import { useTransactions } from "../../hooks/useTransactions";

export default function TransactionsScreen() {
  const router = useRouter();

  const { transactions, deleteTransaction, loadTransactions } =
    useTransactions();

  const { categories, loadCategories } = useCategories();

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      loadCategories();
    }, [loadTransactions, loadCategories]),
  );

  const getCategoryName = (categoryId: number) => {
    return (
      categories.find((category) => category.id === categoryId)?.name ??
      "Sin categoría"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/transaction/new" as never)}
      >
        <Text style={styles.buttonText}>Nueva transacción</Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay transacciones todavía</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.description}</Text>

            <Text style={styles.text}>
              Categoría: {getCategoryName(item.categoryId)}
            </Text>

            <Text style={styles.text}>
              Tipo: {item.type === "income" ? "Ingreso" : "Egreso"}
            </Text>

            <Text style={styles.text}>Monto: ${item.amount}</Text>

            {item.receiptUrl ? (
              <View style={styles.detailBox}>
                <Text style={styles.detailTitle}>Comprobante adjunto</Text>
                <Image source={{ uri: item.receiptUrl }} style={styles.image} />
              </View>
            ) : (
              <Text style={styles.mutedText}>Sin comprobante</Text>
            )}

            {item.latitude && item.longitude ? (
              <View style={styles.detailBox}>
                <Text style={styles.detailTitle}>Ubicación registrada</Text>
                <Text style={styles.text}>Latitud: {item.latitude}</Text>
                <Text style={styles.text}>Longitud: {item.longitude}</Text>
              </View>
            ) : (
              <Text style={styles.mutedText}>Sin ubicación registrada</Text>
            )}

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  router.push(`/(tabs)/transaction/${item.id}` as never)
                }
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTransaction(String(item.id))}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f5",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    color: "#52525b",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#18181b",
  },
  text: {
    color: "#3f3f46",
  },
  mutedText: {
    color: "#71717a",
    fontStyle: "italic",
  },
  detailBox: {
    backgroundColor: "#f4f4f5",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    gap: 4,
  },
  detailTitle: {
    fontWeight: "700",
    color: "#18181b",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginTop: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 8,
  },
});
