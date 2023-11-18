import { Button, Platform, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../general/CustomText";
import { AntDesign } from "@expo/vector-icons";
import CustomTitle from "../general/CustomTitle";

export default function AddAlbumButton() {
  return (
    <View>
      <Pressable
        className="flex flex-row bg-accent p-4 rounded-xl"
        onPress={() => {}}
      >
        <AntDesign name="pluscircle" size={24} color="grey" />
        <CustomText className="ml-3 text-metallic text-xl">
          Add an album
        </CustomText>
      </Pressable>
    </View>
  );
}
