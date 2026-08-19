import { useUsersync } from "@/hooks/useUsersync";
import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
    const { isSignedIn, isLoaded } = useAuth();
    useUsersync()
    if (!isLoaded) {
        return (
            <View style={{ flex: 1, backgroundColor: "#f8fafc", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }
    if (!isSignedIn) return <Redirect href="/sign-in" />;

    return <Slot />;
}