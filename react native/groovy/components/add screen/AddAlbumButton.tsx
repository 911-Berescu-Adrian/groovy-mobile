import { Button, Text, View } from "react-native";
import React, { Component } from "react";
import CustomText from "../general/CustomText";

export default class AddAlbumButton extends Component {
  render() {
    return (
      <View>
        <CustomText>Add an album</CustomText>
      </View>
    );
  }
}
