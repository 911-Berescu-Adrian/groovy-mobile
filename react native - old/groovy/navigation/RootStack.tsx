import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import React, { useEffect } from "react";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddAlbumScreen from "../screens/AddAlbumScreen";
import UpdateAlbumScreen from "../screens/UpdateAlbumScreen";
import DetailAlbumScreen from "../screens/DetailAlbumScreen";

export type RootStackParamList = {
    Landing: undefined;
    Home: undefined;
    Add: undefined;
    Update: undefined;
    Detail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Landing"
            >
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Add" component={AddAlbumScreen} />
                <Stack.Screen name="Update" component={UpdateAlbumScreen} />
                <Stack.Screen name="Detail" component={DetailAlbumScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
