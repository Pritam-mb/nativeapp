import { Link } from "expo-router";
import { Image, ScrollView, View } from "react-native";
// import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function SignInScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      {/* <Text>Sign In</Text> */}
      <View>

        <Image
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <Link href="/(root)/(tabs)">Go to Home</Link>
    </ScrollView>
  );
}
