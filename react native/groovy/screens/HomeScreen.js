import { Button, View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { getAllAlbums } from "../db/DatabaseService";
import { useAlbumsContext } from "../contexts/AlbumsContext";

export default function HomeScreen({ navigation }) {
    // const { data, updateData } = useDataContext();
    const { albums } = useAlbumsContext();
    useEffect(() => {
        console.log("DATA CHANGED");
    }, [albums]);

    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title="Add a new album" onPress={() => navigation.navigate("Add")} />

            <Text>Album List</Text>
            <FlatList
                data={albums}
                keyExtractor={(item) => item.albumId.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>Title: {item.title}</Text>
                        <Text>Artist: {item.artist}</Text>
                        <Text>Year: {item.year}</Text>
                        <Text>Genre: {item.genre}</Text>
                        <Text>No. of Songs: {item.noSongs}</Text>
                        <Text />
                    </View>
                )}
            />
        </View>
    );
}
