import { Button, Pressable, Text, View } from "react-native";
import React, { Component } from "react";
import CustomText from "../general/CustomText";
import { AntDesign } from "@expo/vector-icons";

export default class AddAlbumButton extends Component {
  render() {
    return (
      <View>
        <Pressable
          className="flex flex-row bg-accent p-4 rounded-xl"
          onPress={() => {
            console.log("test");
          }}
        >
          <AntDesign name="pluscircle" size={24} color="grey" />
          <CustomText className="ml-3 text-metallic text-xl">
            Add an album
          </CustomText>
        </Pressable>
      </View>
    );
  }
}
