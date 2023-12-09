import { Button, View, Text, FlatList, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import { deleteAlbum, getAllAlbums } from "../db/DatabaseService";
import { useAlbumsContext } from "../contexts/AlbumsContext";

export default function HomeScreen({ navigation }) {
    const { albums, setAlbums } = useAlbumsContext();

    const handleDelete = (albumId, title) => {
        Alert.alert("Confirm deletion", `Are you sure you want to delete "${title}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: () => {
                    deleteAlbum(albumId);
                    const updatedAlbums = albums.filter((album) => album.albumId !== albumId);
                    setAlbums(updatedAlbums);
                },
                style: "destructive",
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Button title="Add a new album" onPress={() => navigation.navigate("Add")} />

            <Text>Album List</Text>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={albums}
                    keyExtractor={(album) => album.albumId.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Title: {item.title}</Text>
                            <Text>Artist: {item.artist}</Text>
                            <Text>Year: {item.year}</Text>
                            <Text>Genre: {item.genre}</Text>
                            <Text>No. of Songs: {item.noSongs}</Text>
                            <Text />
                            <View>
                                <Button
                                    title="Update"
                                    onPress={() =>
                                        navigation.navigate("Update", {
                                            albumId: item.albumId,
                                            title: item.title,
                                            artist: item.artist,
                                            year: item.year,
                                            genre: item.genre,
                                            noSongs: item.noSongs,
                                        })
                                    }
                                />
                                <Button
                                    title="Delete"
                                    onPress={() => {
                                        handleDelete(item.albumId, item.title);
                                    }}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    flatListContainer: {
        flex: 1,
        marginTop: 10,
    },
});
