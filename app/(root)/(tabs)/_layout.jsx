import { Ionicons } from "@expo/vector-icons";
import { Label } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { useUserStore } from "../../../store/userStor";


export default function TabLayout() {
    const isadmin = useUserStore((state) => state.isadmin) //fetching admin status
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#2563eb" }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />


            <Tabs.Screen
                name="create"
                options={{
                    title: "ADD PROPERTY",
                    href: isadmin ? undefined : null,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
