import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useAuth()
  const { user } = useUser()
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {user?.imageUrl && (
        <Image 
          source={{ uri: user.imageUrl }} 
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }} 
        />
      )}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={{ fontSize: 16, color: "gray", marginBottom: 32 }}>
        {user?.emailAddresses[0]?.emailAddress}
      </Text>
      
      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "#ef4444", borderRadius: 8, width: 200, alignItems: "center" }}
        onPress={onSignOut}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
