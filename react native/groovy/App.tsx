import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import React, { useEffect } from "react";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import RootStack from "./navigation/RootStack";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        Helvetica: require("./assets/fonts/helvetica/Helvetica.ttf"),
        HelveticaBold: require("./assets/fonts/helvetica/HelveticaBold.ttf"),
        HelveticaLight: require("./assets/fonts/helvetica/HelveticaLight.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <SafeAreaProvider>
                    <StatusBar style="light" />
                    <RootStack />
                </SafeAreaProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
