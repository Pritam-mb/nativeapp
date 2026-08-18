import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const isLoading = fetchStatus === "fetching";

  const onSignIn = async () => {
    if (!signIn) return;
    setError("");
    try {
      const result = await signIn.password({
        emailAddress: email,
        password: password,
      });
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            const url = decorateUrl("/");
            router.replace(url as any);
          },
        });
      } else if (signIn.status === "needs_second_factor") {
        await signIn.mfa.sendPhoneCode();
      } else if (signIn.status === "needs_first_factor") {
        const emailCodeFactor = signIn.supportedSecondFactors.find(
          (factor) => factor.strategy === "email_code"
        );
        if (emailCodeFactor) {
          await signIn.mfa.sendPhoneCode();
        }
      } else {
        console.error("Sign-in attempt not complete:", signIn);
      }
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid email or password.";
      setError(msg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#000000" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 150, height: 150, marginBottom: 20 }}
            resizeMode="contain"
            borderRadius={75}
          />

          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Welcome back
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#a59d9d",
              marginTop: 8,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            Sign in to SpectraX
          </Text>

          {error ? (
            <Text
              style={{
                color: "#ef4444",
                marginTop: 16,
                marginBottom: 4,
                paddingHorizontal: 10,
                textAlign: "center",
                fontFamily: "Poppins-Regular",
              }}
            >
              {error}
            </Text>
          ) : null}

          <View style={{ width: "100%", marginTop: 20 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888888"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (emailError) setEmailError("");
                if (error) setError("");
              }}
              onBlur={() => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.length > 0 && !emailRegex.test(email)) {
                  setEmailError("Please enter a valid email address");
                }
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                fontSize: 16,
                color: "#ffffff",
                fontFamily: "Poppins-SemiBold",
                backgroundColor: "#1c1c1c",
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#333333",
                paddingVertical: 14,
                paddingHorizontal: 16,
              }}
            />
            {emailError ? (
              <Text
                style={{
                  color: "#ef4444",
                  marginBottom: 4,
                  marginTop: 8,
                  paddingHorizontal: 10,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {emailError}
              </Text>
            ) : null}
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888888"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (passwordError) setPasswordError("");
                if (error) setError("");
              }}
              onBlur={() => {
                if (password.length > 0 && password.length < 8) {
                  setPasswordError("Password must be at least 8 characters long");
                }
              }}
              secureTextEntry
              style={{
                fontSize: 16,
                color: "#ffffff",
                fontFamily: "Poppins-SemiBold",
                backgroundColor: "#1c1c1c",
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#333333",
                paddingVertical: 14,
                paddingHorizontal: 16,
              }}
            />
            {passwordError ? (
              <Text
                style={{
                  color: "#ef4444",
                  marginBottom: 4,
                  marginTop: 8,
                  paddingHorizontal: 10,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {passwordError}
              </Text>
            ) : null}

            <TouchableOpacity
              disabled={isLoading}
              onPress={onSignIn}
              style={{
                backgroundColor: "#333333",
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#333333",
                paddingVertical: 14,
                paddingHorizontal: 16,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 24,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  Sign in
                </Text>
              )}
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 24,
                gap: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Don't have an account?{" "}
              </Text>
              <Link href="/sign-up">
                <Text
                  style={{
                    color: "#e7430dff",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  Sign up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}