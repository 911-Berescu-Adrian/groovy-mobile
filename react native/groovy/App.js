import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import UpdateScreen from "./screens/UpdateScreen";
import AddScreen from "./screens/AddScreen";
import { AlbumsProvider } from "./contexts/AlbumsContext";
import { getAllAlbums, initDatabase, insertAlbum } from "./db/DatabaseService";

const Stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {
        initDatabase();
        insertAlbum({ albumId: 0, title: "a", artist: "b", year: 3, genre: "c", noSongs: 0 });
    }, []);

    return (
        <AlbumsProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Add" component={AddScreen} />
                    <Stack.Screen name="Update" component={UpdateScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AlbumsProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
