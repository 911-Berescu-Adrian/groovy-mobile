import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export const initDatabase = (onError) => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS albums (albumId INTEGER PRIMARY KEY, title TEXT, artist TEXT, year INTEGER, genre TEXT, noSongs INTEGER);",
            [],
            () => console.log("Table created successfully"),
            (_, error) => {
                console.error("Error creating table:", error);
                onError("Error creating table", error);
            }
        );
    });
};

export const dropTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS albums;",
            [],
            () => console.log("Table dropped successfully"),
            (_, error) => console.error("Error dropping table:", error)
        );
    });
};

export const insertAlbum = (album, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "INSERT INTO albums (albumId, title, artist, year, genre, noSongs) VALUES (?, ?, ?, ?, ?, ?);",
                [album.albumId, album.title, album.artist, album.year, album.genre, album.noSongs],
                (_, result) => console.log("Album inserted successfully"),
                (_, error) => {
                    console.error(`Error inserting album "${album.title}. Duplicate key."`, error);
                    onError(`Error inserting album "${album.title}". Duplicate key.`, error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};

export const getAllAlbums = (callback, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "SELECT * FROM albums;",
                [],
                (_, result) => callback(result.rows._array),
                (_, error) => {
                    console.error("Error fetching albums:", error);
                    onError("Error fetching albums", error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};

export const updateAlbum = (album, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "UPDATE albums SET title=?, artist=?, year=?, genre=?, noSongs=? WHERE albumId=?;",
                [album.title, album.artist, album.year, album.genre, album.noSongs, album.albumId],
                (_, result) => console.log("Album updated successfully"),
                (_, error) => {
                    console.error("Error updating album:", error);
                    onError("Error updating album", error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};

export const deleteAlbum = (albumId, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "DELETE FROM albums WHERE albumId=?;",
                [albumId],
                (_, result) => console.log("Album deleted successfully"),
                (_, error) => {
                    console.error("Error deleting album:", error);
                    onError("Error deleting album", error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};
