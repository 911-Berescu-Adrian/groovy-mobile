import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { updateAlbum } from "../db/DatabaseService";
import { useAlbumsContext } from "../contexts/AlbumsContext";

const UpdateAlbumScreen = ({ route, navigation }) => {
    const { albums, setAlbums } = useAlbumsContext();

    const [title, setTitle] = useState(route.params.title);
    const [artist, setArtist] = useState(route.params.artist);
    const [year, setYear] = useState(route.params.year.toString());
    const [genre, setGenre] = useState(route.params.genre);
    const [noSongs, setNoSongs] = useState(route.params.noSongs.toString());

    const updateAlbumDetails = () => {
        if (!title || !artist || !year || !genre || !noSongs) {
            alert("Please fill in all fields.");
            return;
        }
        const updatedAlbum = {
            albumId: route.params.albumId,
            title,
            artist,
            year: parseInt(year),
            genre,
            noSongs: parseInt(noSongs),
        };

        updateAlbum(updatedAlbum);
        const updatedAlbums = albums.map((album) => (album.albumId === updatedAlbum.albumId ? updatedAlbum : album));
        setAlbums(updatedAlbums);

        navigation.navigate("Home");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />

            <Text style={styles.label}>Artist</Text>
            <TextInput style={styles.input} value={artist} onChangeText={(text) => setArtist(text)} />

            <Text style={styles.label}>Year</Text>
            <TextInput
                style={styles.input}
                value={year}
                onChangeText={(text) => setYear(text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Genre</Text>
            <TextInput style={styles.input} value={genre} onChangeText={(text) => setGenre(text)} />

            <Text style={styles.label}>Number of Songs</Text>
            <TextInput
                style={styles.input}
                value={noSongs}
                onChangeText={(text) => setNoSongs(text)}
                keyboardType="numeric"
            />

            <Button title="Update Album" onPress={updateAlbumDetails} />
            <Button
                title="Cancel"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default UpdateAlbumScreen;
