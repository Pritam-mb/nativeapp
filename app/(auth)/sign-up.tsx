import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const [code, setCode] = useState("")
  const router = useRouter()
  const isLoaded = fetchStatus === "fetching";

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }


  const onVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  const onSignuppress = async () => {
    const { error } = await signUp?.password({
      firstName: firstname,
      lastName: lastname,
      emailAddress: email,
      password: password,
    });
    if (error) {
      console.log(JSON.stringify(error, null, 2));

    }
    if (!error) {
      await signUp.verifications.sendEmailCode()
    }
    // router.push("/");


  }
  if (signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
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
          }}>

          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 120, height: 120, marginBottom: 24 }}
              resizeMode="contain"
              borderRadius={60}
            />

            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
                fontFamily: "Poppins-SemiBold",
              }}
            >
              Verify your email
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#a59d9d",
                marginTop: 8,
                textAlign: "center",
                fontFamily: "Poppins-Regular",
                marginBottom: 32,
              }}
            >
              We've sent a code to {email}
            </Text>

            <TextInput
              placeholder="Enter 6-digit code"
              placeholderTextColor="#888888"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              style={{
                width: "100%",
                fontSize: 18,
                color: "#ffffff",
                fontFamily: "Poppins-SemiBold",
                backgroundColor: "#1c1c1c",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#333333",
                paddingVertical: 16,
                paddingHorizontal: 20,
                textAlign: "center",
                letterSpacing: 4,
              }}
            />

            <TouchableOpacity
              onPress={onVerify}
              disabled={isLoaded}
              className="w-full bg-blue-600 py-4 rounded-2xl items-center mb-4 gap-2 mt-2"
            >
              {isLoaded ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-xl rounded-xl">Verify</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => signUp.verifications.sendEmailCode()}>
              <Text style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Poppins-SemiBold",
              }}>
                I need a new code
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
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
        }}>

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
            Create account
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
            Welcome to SpectraX
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 20,
              // borderWidth: 10,
              // borderColor: "#f9f2f2ff"
            }}>
            <TextInput
              placeholder="First name"
              placeholderTextColor="#888888"
              value={firstname}
              onChangeText={setFirstname}
              style={{
                // flex: 1,
                fontSize: 16,
                color: "#ffffff",
                fontFamily: "Poppins-SemiBold",
                backgroundColor: "#1c1c1c",
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#333333",
                paddingVertical: 14,
                paddingHorizontal: 16,
                // marginRight: 12,
                width: "48%",
              }}
            />
            <TextInput
              placeholder="Last name"
              placeholderTextColor="#888888"
              value={lastname}
              onChangeText={setLastname}
              style={{
                // flex: 1,
                fontSize: 16,
                color: "#ffffff",
                fontFamily: "Poppins-SemiBold",
                backgroundColor: "#1c1c1c",
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#333333",
                paddingVertical: 14,
                paddingHorizontal: 16,
                width: "48%"
              }}
            />

          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888888"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (emailError) setEmailError("");
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
              <Text style={{ color: "#ef4444", marginBottom: 16, marginTop: 8, paddingHorizontal: 10 }}>
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
              <Text style={{ color: "#ef4444", marginBottom: 16, marginTop: 8, paddingHorizontal: 10 }}>
                {passwordError}
              </Text>
            ) : null}

            <TouchableOpacity disabled={isLoaded}
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
              onPress={onSignuppress}
            >
              {isLoaded ? (
                <ActivityIndicator color="white" />

              ) : (
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >Create account</Text>
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
              >Already have an account? </Text>
              <Link href="/sign-in">
                <Text
                  style={{
                    color: "#e7430dff",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >Sign in</Text>
              </Link>

            </View>
          </View>
          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
