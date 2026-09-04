import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
// import {formatprice} from "@/lib/utils"
import { formatPrice } from "@/lib/utils";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function FeaturedCard({ property }: { property: Property }) {
    const router = useRouter();
    return (
        <TouchableOpacity
    //    onPress={() => router.push(``)}
      className="w-72 mr-4 rounded-3xl overflow-hidden bg-transparent"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,

        opacity: property.issold ? 0.5 : 1,}}>
            <Image
                source={{ uri: property.images[0] }}
                style={{  borderRadius: 16 }}
                className="w-full h-44 rounded-xl mb-2"
            />
            <View className="w-20 h-5 absolute top-2 left-2 bg-white px-3 py-1 rounded-full flex items-center justify-center">
                <Text className="text-sm font-semibold text-black ">
                    {property.type}
                </Text>
            </View>
            {property.issold && (
                <View className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded-full">
                    <Text className="text-sm font-semibold text-white">
                        Sold
                        </Text>
                        </View>)}

            {/* <View className="px-2"> */}
              <View className="p-4">
        <Text
          className="text-base font-bold text-gray-800 mb-1"
          numberOfLines={1}
        >
          {property.title}
        </Text>

        <View className="flex-row items-center gap-1 mb-3">
          <Ionicons name="location-outline" size={13} color="#6B7280" />
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-blue-600 font-bold text-base">
            {formatPrice(property.price)}
          </Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">{property.bedrooms}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="water-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {property.bathrooms}
              </Text>
            </View>
          </View>
        </View>
      </View>
        </TouchableOpacity>
    )
}