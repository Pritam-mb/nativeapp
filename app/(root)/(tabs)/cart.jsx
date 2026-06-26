import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#1e293b", marginBottom: 8 }}>
          Cart
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b" }}>
          Your cart is empty.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
