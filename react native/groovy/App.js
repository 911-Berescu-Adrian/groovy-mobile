import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import UpdateScreen from "./screens/UpdateScreen";
import AddScreen from "./screens/AddScreen";
import { AlbumsProvider, useAlbumsContext } from "./contexts/AlbumsContext";
import { BACKEND_URL, SOCKET_URL } from "./constants";
import { copyDataToLocalDatabase, dropTable, getAllAlbums, initDatabase, insertAlbum } from "./db/DatabaseService";
import axios from "axios";

const Stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {
        initDatabase(alert);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(BACKEND_URL + "/album");
            copyDataToLocalDatabase(response.data, alert);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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
