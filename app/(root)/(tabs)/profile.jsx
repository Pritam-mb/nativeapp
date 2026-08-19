import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
export default function ProfileScreen() {
  const { signOut } = useAuth()
  const
  const router = useRouter()
  const onSignOut = async () => {
    try {
      await signOut()
      router.replace('/sign-in')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={onSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
