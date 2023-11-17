import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import CustomTitle from "./CustomTitle";
import CustomText from "./CustomText";

const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<CustomTitle {...props} />}>
      <LinearGradient
        colors={["#EA27BF", "#E57070"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <CustomTitle {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
