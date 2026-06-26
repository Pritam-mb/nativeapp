import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#1e293b", marginBottom: 8 }}>
          Home
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b" }}>
          Welcome to your app!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
