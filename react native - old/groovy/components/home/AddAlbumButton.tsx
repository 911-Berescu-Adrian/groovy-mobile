import { Button, Platform, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../general/CustomText";
import { AntDesign } from "@expo/vector-icons";
import CustomTitle from "../general/CustomTitle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStack";

type AddAlbumButtonProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function AddAlbumButton({ navigation }: AddAlbumButtonProps) {
  const handlePress = () => {
    navigation.navigate("Add");
  };

  return (
    <View>
      <Pressable
        className="flex flex-row bg-accent p-4 rounded-xl w-48 ml-6"
        onPress={handlePress}
      >
        <AntDesign name="pluscircle" size={24} color="grey" />
        <CustomText className="ml-3 text-metallic text-xl">
          Add an album
        </CustomText>
      </Pressable>
    </View>
  );
}
