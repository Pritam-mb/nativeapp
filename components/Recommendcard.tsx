import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { useSavedStore } from "@/store/savedStore";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function RecommendCard({
  property,
}: {
  property: Property;
}) {
  const savedIds = useSavedStore((state) => state.savedIds);
  const toggleSaved = useSavedStore((state) => state.toggleSaved);
  const isSaved = savedIds.includes(property.id);

  return (
    <TouchableOpacity className="w-72 h-40 flex flex-row mx-5 mb-4 overflow-hidden rounded-2xl bg-white">
      <View className="w-40">
        <Image
          source={{ uri: property.images[0] }}
          className="h-40 w-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => toggleSaved(property.id)}
          accessibilityRole="button"
          accessibilityLabel="Save property"
          className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-white"
        >
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={20}
            color={isSaved ? "#ef4444" : "#1F2937"}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4 flex-1 ">
     
        <Text className="mb-1 text-base font-bold text-gray-900" numberOfLines={1}>
          {property.title}
        </Text>
        <View className="flex-row items-center gap-1 mb-3">
                 <Ionicons name="location-outline" size={13} color="#6B7280" />
                 <Text className="text-xs text-gray-500" numberOfLines={1}>
                   {property.city}
                 </Text>
                </View>
        <View className="flex-row items-center justify-between">

        <Text className="text-base font-bold text-blue-600">
          {formatPrice(property.price)}
        </Text>
        <View className="flex-row  items-center gap-3">
          <View>
            <Ionicons name="bed-outline" size={13} color="#6B7280" />
            <Text className="text-xs text-gray-500">{property.bedroom}</Text>
          </View>
          <View>
            <Ionicons name="resize-outline" size={13} color="#6B7280" />
            <Text className="text-xs text-gray-500">{property.area}</Text>
          </View>
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}