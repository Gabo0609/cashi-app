import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useTransactions } from "../../hooks/useTransactions";

export default function BalanceScreen() {
  const { totalIncome, totalExpense, balance, loadTransactions } =
    useTransactions();

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Total ingresos</Text>

        <Text style={styles.income}>${totalIncome}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total egresos</Text>

        <Text style={styles.expense}>${totalExpense}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Balance</Text>

        <Text style={styles.balance}>${balance}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: "#f4f4f5",
  },

  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
  },

  label: {
    fontSize: 16,
    color: "#52525b",
    marginBottom: 8,
  },

  income: {
    fontSize: 28,
    fontWeight: "700",
    color: "#16a34a",
  },

  expense: {
    fontSize: 28,
    fontWeight: "700",
    color: "#dc2626",
  },

  balance: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2563eb",
  },
});
