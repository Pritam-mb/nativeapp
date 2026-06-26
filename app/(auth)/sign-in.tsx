import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function SignInScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Sign In</Text>
      <Link href="/(root)/(tabs)">Go to Home</Link>
    </ScrollView>
  );
}
