import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomTitle from "../general/CustomTitle";

interface Props {
  children?: ReactNode;
}

export default function AlbumCard({ children }: Props) {
  return (
    <View>
      <LinearGradient
        colors={["#ace474", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.5 }}
        className="w-24 h-24 rounded-lg"
      >
        <Fontisto name="music-note" size={24} color="black" />
        <MaterialIcons name="music-note" size={24} color="black" />
      </LinearGradient>
      {children && (
        <CustomTitle className="text-metallic uppercase text-lg">
          {children}
        </CustomTitle>
      )}
    </View>
  );
}
