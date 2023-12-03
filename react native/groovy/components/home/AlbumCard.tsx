import { View, Text, Pressable } from "react-native";
import React, { ReactNode, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomTitle from "../general/CustomTitle";
import CustomText from "../general/CustomText";
import { Album } from "../../model/Album";
import AlbumDetailBottomSheet from "./AlbumDetailBottomSheet";

interface Props {
  albumId: number;
  title: string;
  children?: ReactNode;
}

export default function AlbumCard({ albumId, title, children }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View className="flex flex-col items-center px-3 py-4">
      {isPressed && <AlbumDetailBottomSheet></AlbumDetailBottomSheet>}
      <Pressable
        onPress={() => {
          setIsPressed(true);
          console.log("test");
        }}
      >
        <LinearGradient
          colors={["#ace474", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.5 }}
          className="w-36 h-36 rounded-2xl items-center justify-center"
        >
          <Fontisto name="music-note" size={64} color="black" />
          {/* <MaterialIcons name="music-note" size={24} color="black" /> */}
        </LinearGradient>
        {title && (
          <CustomText className="text-metallic uppercase text-lg text-center mt-2">
            {title}
          </CustomText>
        )}
      </Pressable>
    </View>
  );
}
