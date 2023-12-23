import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { useAlbumsContext } from "../contexts/AlbumsContext";
import { insertAlbum, insertTemporaryAction } from "../db/DatabaseService";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useActionsContext } from "../contexts/ActionContext";

const AddAlbumScreen = ({ navigation }) => {
    const { albums, setAlbums } = useAlbumsContext();
    const { actions, setActions } = useActionsContext();

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
            albumId: Math.random().toString(36).slice(3, 9),
            title,
            artist,
            year: parseInt(year),
            genre,
            noSongs: parseInt(noSongs),
        };

        const newAction = {
            actionType: "create",
            albumId: newAlbum.albumId,
            title,
            artist,
            year: parseInt(year),
            genre,
            noSongs: parseInt(noSongs),
        };

        insertTemporaryAction(
            newAction,
            () => {
                setAlbums([...albums, newAlbum]);
                setActions([...actions, newAction]);
            },
            alert
        );

        navigation.goBack();
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
