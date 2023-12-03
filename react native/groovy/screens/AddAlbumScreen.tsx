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
import { ScrollView } from "react-native-gesture-handler";

type AddAlbumScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Add">;
};

export default function AddAlbumScreen({ navigation }: AddAlbumScreenProps) {
  const handleAdd = () => {
    console.log("add");
    navigation.navigate("Home");
  };
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 items-center  bg-background">
        <GradientText className="text-4xl text-metallic mt-20 mb-12">
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
        <View className="flex flex-row gap-8 mt-10 mb-12">
          <Pressable
            className="bg-[#322330] w-36 p-4 text-center rounded-full justify-center items-center"
            onPress={() => navigation.goBack()}
          >
            <CustomTitle className="text-xl text-metallic">Cancel</CustomTitle>
          </Pressable>
          <Pressable
            className="bg-green-800 w-36 text-center rounded-full justify-center items-center"
            onPress={handleAdd}
          >
            <CustomTitle className="text-xl text-metallic">
              Add Album
            </CustomTitle>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
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
