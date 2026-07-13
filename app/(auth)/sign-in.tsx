import { useSignIn } from "@clerk/expo";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onverify = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password: password,
    })
  }
  return (
    <ScrollView>
      <View>
        <Text>Sign in</Text>
        <TextInput placeholder="Email" placeholderTextColor="#888888" value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" placeholderTextColor="#888888" value={password} onChangeText={setPassword} />
        <TouchableOpacity
          onPress={onverify}>
          <Text>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>)
}