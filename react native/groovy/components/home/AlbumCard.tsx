import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomTitle from "../general/CustomTitle";
import CustomText from "../general/CustomText";

interface Props {
  children?: ReactNode;
}

export default function AlbumCard({ children }: Props) {
  return (
    <View className="flex flex-col items-center gap-y-2">
      <LinearGradient
        colors={["#ace474", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.5 }}
        className="w-40 h-40 rounded-2xl items-center justify-center"
      >
        <Fontisto name="music-note" size={72} color="black" />
        {/* <MaterialIcons name="music-note" size={24} color="black" /> */}
      </LinearGradient>
      {children && (
        <CustomText className="text-metallic uppercase text-lg">
          {children}
        </CustomText>
      )}
    </View>
  );
}
