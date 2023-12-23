import { Button, View, Text, FlatList, StyleSheet, Alert } from "react-native";
import React, { useEffect, useRef } from "react";
import {
    copyDataToLocalDatabase,
    deleteAlbum,
    deleteTemporaryAction,
    getAllAlbums,
    insertAlbum,
    updateAlbum,
} from "../db/DatabaseService";
import { useAlbumsContext } from "../contexts/AlbumsContext";
import { BACKEND_URL, SOCKET_URL } from "../constants";
import { useActionsContext } from "../contexts/ActionContext";
import axios from "axios";

export default function HomeScreen({ navigation }) {
    const { albums, setAlbums } = useAlbumsContext();
    const { actions, setActions } = useActionsContext();

    const socketRef = useRef(null);

    console.log("actions", actions);
    console.log("albums", albums);

    const handleDelete = (albumId, title) => {
        Alert.alert("Confirm deletion", `Are you sure you want to delete "${title}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: () => {
                    deleteAlbum(
                        albumId,
                        () => {
                            const updatedAlbums = albums.filter((album) => album.albumId !== albumId);
                            setAlbums(updatedAlbums);
                        },
                        alert
                    );
                },
                style: "destructive",
            },
        ]);
    };

    const initSocket = () => {
        socketRef.current = new WebSocket(SOCKET_URL);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection opened");
        };

        socketRef.current.onmessage = (event) => {
            console.log("Received message:", event.data);
            const parsedMessage = JSON.parse(event.data);
            switch (parsedMessage.type) {
                case "create":
                    handleServerCreate(parsedMessage.data);
                    break;
                case "remove":
                    handleServerRemove(parsedMessage.data);
                    break;
                case "update":
                    handleServerUpdate(parsedMessage.data);
                    break;
                default:
                    console.warn("Unknown message type:", parsedMessage.type);
            }
        };

        socketRef.current.onclose = (event) => {
            console.log("WebSocket connection closed:", event.code, event.reason);
        };

        socketRef.current.onerror = (event) => {
            console.error("Couldn't connect to WebSocket. Check internet connection.");
        };
    };

    useEffect(() => {
        sendActionsToServer();
    }, [actions]);

    const sendActionsToServer = async () => {
        for (const action of actions) {
            try {
                switch (action.actionType) {
                    case "create":
                        await axios.post(`${BACKEND_URL}/album`, action);
                        deleteTemporaryAction(
                            action.albumId,
                            () => {
                                setActions((prevActions) =>
                                    prevActions.filter((act) => act.queueId !== action.queueId)
                                );
                                setAlbums((prevAlbums) =>
                                    prevAlbums.filter((album) => album.albumId !== action.albumId)
                                );
                            },
                            alert
                        );
                        break;

                    case "update":
                        await axios.put(`${BACKEND_URL}/album`, action);
                        break;
                    case "remove":
                        await axios.delete(`${BACKEND_URL}/album/${action.albumId}`);
                        break;
                    default:
                        console.warn("Unknown action type:", action.actionType);
                }
                setActions((prevActions) => prevActions.filter((act) => act.queueId !== action.queueId));
            } catch (error) {
                console.error("Couldn't connect to the server. Check internet connection.");
            }
        }
    };

    useEffect(() => {
        initSocket();
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleServerCreate = (albumData) => {
        const newAlbum = {
            albumId: albumData.albumId,
            title: albumData.title,
            artist: albumData.artist,
            year: albumData.year,
            genre: albumData.genre,
            noSongs: albumData.noSongs,
        };

        insertAlbum(newAlbum, () => setAlbums((prevAlbums) => [...prevAlbums, newAlbum]), alert);
    };

    const handleServerRemove = (albumId) => {
        deleteAlbum(
            albumId,
            () => {
                setAlbums((prevAlbums) => {
                    const updatedAlbums = prevAlbums.filter((album) => album.albumId !== albumId);
                    return updatedAlbums;
                });
            },
            alert
        );
    };

    const handleServerUpdate = (albumData) => {
        const updatedAlbum = {
            albumId: albumData.albumId,
            title: albumData.title,
            artist: albumData.artist,
            year: albumData.year,
            genre: albumData.genre,
            noSongs: albumData.noSongs,
        };

        updateAlbum(
            updatedAlbum,
            () => {
                setAlbums((prevAlbums) => {
                    const updatedAlbums = prevAlbums.map((album) =>
                        album.albumId === updatedAlbum.albumId ? updatedAlbum : album
                    );
                    return updatedAlbums;
                });
            },
            alert
        );

        console.log("albums", albums);
        console.log("actions", actions);
    };

    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Button title="Add a new album" onPress={() => navigation.navigate("Add")} />

            <Text>Album List</Text>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={albums}
                    keyExtractor={(album) => album.albumId}
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
                                    color="#fc0341"
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
