// AddAlbumScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { useAlbumsContext } from "../contexts/AlbumsContext";
import { insertAlbum } from "../db/DatabaseService";

const AddAlbumScreen = ({ navigation }) => {
    const { albums, setAlbums } = useAlbumsContext();

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [noSongs, setNoSongs] = useState("");

    const addAlbum = () => {
        if (!title || !artist || !year || !genre || !noSongs) {
            alert("Please fill in all fields.");
            return;
        }

        const newAlbum = {
            albumId: albums.reduce((maxId, album) => Math.max(maxId, album.albumId), 0) + 1,
            title,
            artist,
            year: parseInt(year),
            genre,
            noSongs: parseInt(noSongs),
        };

        insertAlbum(newAlbum, () => setAlbums([...albums, newAlbum]), alert);

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

            <Button title="Add Album" onPress={addAlbum} />
            <Text></Text>
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

export default AddAlbumScreen;
