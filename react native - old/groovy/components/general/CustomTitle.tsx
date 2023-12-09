import React from "react";
import { Text, StyleSheet } from "react-native";

export default function CustomTitle(props: any) {
  return (
    <Text style={[styles.defaultStyle, props.style]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "HelveticaBold",
  },
});
