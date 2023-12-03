import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import GradientText from "../components/general/GradientText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStack";
import CustomText from "../components/general/CustomText";
import CustomTitle from "../components/general/CustomTitle";

type UpdateAlbumScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Update">;
};

export default function UpdateAlbumScreen({
  navigation,
}: UpdateAlbumScreenProps) {
  return (
    <SafeAreaView className="flex-1 items-center justify-top bg-background">
      <GradientText className="text-4xl text-metallic mt-20 mb-20">
        Groovy
      </GradientText>
      <View className="flex flex-col flex-wrap justify-center">
        <TextInput
          placeholder="Title"
          placeholderTextColor={"#555659"}
          style={styles.input}
          className="text-metallic text-2xl rounded-xl"
        ></TextInput>
        <TextInput
          placeholder="Artist"
          placeholderTextColor={"#555659"}
          style={styles.input}
          className="text-metallic text-2xl rounded-xl"
        ></TextInput>
        <TextInput
          placeholder="Year"
          placeholderTextColor={"#555659"}
          style={styles.input}
          className="text-metallic text-2xl rounded-xl"
        ></TextInput>
        <TextInput
          placeholder="Genre"
          placeholderTextColor={"#555659"}
          style={styles.input}
          className="text-metallic text-2xl rounded-xl"
        ></TextInput>
        <TextInput
          placeholder="No. Songs"
          placeholderTextColor={"#555659"}
          style={styles.input}
          className="text-metallic text-2xl rounded-xl"
        ></TextInput>
      </View>
      <View className="flex flex-row gap-8 mt-1">
        <Pressable className="bg-[#322330] w-36 p-4 text-center rounded-full justify-center items-center">
          <CustomTitle className="text-xl text-metallic">Cancel</CustomTitle>
        </Pressable>
        <Pressable className="bg-green-800 w-36 text-center rounded-full justify-center items-center">
          <CustomTitle className="text-xl text-metallic">Update</CustomTitle>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 70,
    width: 300,
    marginBottom: 35,
    backgroundColor: "#2C2B2B",
    paddingHorizontal: 25,
  },
});
