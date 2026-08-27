import { Property } from "@/types";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
export default function FeaturedCard({ property }: { property: Property }) {
    return (
        <TouchableOpacity>
            <Image
                source={{ uri: property.images[0] }}
                style={{ width: 220, height: 150, borderRadius: 16 }}
                className="w-60 h-32 rounded-xl mb-2"
            />
        </TouchableOpacity>
    )
}