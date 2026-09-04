import FeaturedCard from "@/components/FeaturedCard";
import { supabase } from "@/lib/supabase"; //we use it fpr public data that anyone can watch or read..so we dont pass here any token bec supabase doesnt need to know who the user just pass the url and annon key
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecommendCard from "../../../components/Recommendcard";
export default function HomeScreen() {
  const { user } = useUser()
  const router = useRouter()
  const [featured, setFeatured] = useState([]);
  const [reccomended, setreccomended] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchproperties = async () => {
    setLoading(true)
    try {
      const { data: featureddata, error } = await supabase.from('properties').select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(10)
      setFeatured(featureddata ?? [])
    } catch (error) {
      console.log("error fetching featured properties:", error)
    }

    try {
      const { data: reccomendeddata, error: reccomendedError } = await supabase.from('properties').select('*')
        .eq('is_featured', false)
        .order('created_at', { ascending: false })
        .limit(10)
      setreccomended(reccomendeddata ?? [])
    } catch (error) {
      console.log("error fetching reccomended properties:", error)
    }
    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    fetchproperties()
  }, []))

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <FlatList
        data={reccomended}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <RecommendCard property={item} key={item.id} />}
        ListHeaderComponent={
          <View>
            {/* Top Navbar Row */}
            <View className="flex-row items-center justify-between px-5 py-4 w-full">
              {/* Left side: Logo & Greeting */}
              <View className="flex-row items-center">
                <View className="bg-white p-1 rounded-full shadow-sm">
                  <Image
                    source={require("../../../assets/images/logo.png")}
                    style={{ width: 44, height: 44, borderRadius: 22, resizeMode: "contain" }}
                  />
                </View>
                <View className="ml-3">
                  <Text className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Good Morning
                  </Text>
                  <Text className="text-xl font-bold text-gray-900">
                    {user?.firstName || "User"} 👋
                  </Text>
                </View>
              </View>

              {/* Right side: Notification Bell */}
              <View className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100">
                <Ionicons name="notifications-outline" size={22} color="#1f2937" />
              </View>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/search")}
              className="mx-5 mb-6 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Ionicons name="search-outline" size={18} color="#9CA3AF" />
              <Text className="text-gray-400 text-sm flex-1">
                Search properties, cities...
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(tabs)/search?openFilters=true")
                }
                className="w-8 h-8 bg-blue-600 rounded-xl items-center justify-center"
              >
                <Ionicons name="options-outline" size={15} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Featured Section */}
            <View className="mb-6">
              <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
                Featured
              </Text>

              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#2563EB"
                  className="py-10"
                />
              ) : (
                <FlatList
                  data={featured}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <FeaturedCard property={item} key={item.id} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                />
              )}
            </View>

            {/* Recommended Header */}
            <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
              Recommended
            </Text>
            
          </View>
        }
        renderItem={({ item }) => (
          <View><RecommendCard property={item} key={item.id}/></View>)
        }
      />
    </SafeAreaView>
  );
}
