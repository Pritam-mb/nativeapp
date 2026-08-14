import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) {
      return (
          <View style={{ flex: 1, backgroundColor: "#000000", justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#ffffff" />
          </View>
      );
  }
  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/sign-up" />
}