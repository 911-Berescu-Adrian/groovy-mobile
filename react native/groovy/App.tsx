import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import React, { useEffect } from "react";
import * as Font from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    Helvetica: require("./assets/fonts/helvetica/Helvetica.ttf"),
    HelveticaBold: require("./assets/fonts/helvetica/HelveticaBold.ttf"),
    HelveticaLight: require("./assets/fonts/helvetica/HelveticaLight.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarStyle: "light",
          statusBarColor: "transparent",
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
