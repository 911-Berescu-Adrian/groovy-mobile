import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export const initDatabase = (onError) => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS albums (albumId TEXT PRIMARY KEY, title TEXT, artist TEXT, year INTEGER, genre TEXT, noSongs INTEGER);",
            [],
            () => console.log("Table created successfully"),
            (_, error) => {
                console.error("Error creating table:", error);
                onError("Error creating table", error);
            }
        );
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS temporaryActions (queueId INTEGER PRIMARY KEY AUTOINCREMENT, actionType TEXT, albumId TEXT, title TEXT, artist TEXT, year INTEGER, genre TEXT, noSongs INTEGER);",
            [],
            () => console.log("TemporaryActions table created successfully"),
            (_, error) => {
                console.error("Error creating TemporaryActions table:", error);
                onError("Error creating TemporaryActions table", error);
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
        tx.executeSql(
            "DROP TABLE IF EXISTS temporaryActions;",
            [],
            () => console.log("Table dropped successfully"),
            (_, error) => console.error("Error dropping table:", error)
        );
    });
};

export const insertAlbum = (album, onSuccess, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "INSERT INTO albums (albumId, title, artist, year, genre, noSongs) VALUES (?, ?, ?, ?, ?, ?);",
                [album.albumId, album.title, album.artist, album.year, album.genre, album.noSongs],
                (_, result) => {
                    onSuccess();
                    console.log("Album inserted successfully");
                },
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

export const copyDataToLocalDatabase = (serverAlbums, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql("DELETE FROM albums;", [], (_, result) => {
                serverAlbums.forEach((album) => {
                    tx.executeSql(
                        "INSERT INTO albums (albumId, title, artist, year, genre, noSongs) VALUES (?, ?, ?, ?, ?, ?);",
                        [album.albumId, album.title, album.artist, album.year, album.genre, album.noSongs],
                        (_, result) => {
                            console.log("Album copied to local database:", album);
                        },
                        (_, error) => {
                            console.error("Error copying album to local database:", error);
                            onError("Error copying album to local database", error);
                        }
                    );
                });
            });
        },
        null,
        () => {
            console.log("Transaction completed");
        }
    );
};

export const updateAlbum = (album, onSuccess, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "UPDATE albums SET title=?, artist=?, year=?, genre=?, noSongs=? WHERE albumId=?;",
                [album.title, album.artist, album.year, album.genre, album.noSongs, album.albumId],
                (_, result) => {
                    onSuccess();
                    console.log("Album updated successfully");
                },
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

export const deleteAlbum = (albumId, onSuccess, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "DELETE FROM albums WHERE albumId=?;",
                [albumId],
                (_, result) => {
                    onSuccess();
                    console.log("Album deleted successfully");
                },
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

export const insertTemporaryAction = (action, onSuccess, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "INSERT INTO temporaryActions (actionType, albumId, title, artist, year, genre, noSongs) VALUES (?, ?, ?, ?, ?, ?, ?);",
                [
                    action.actionType,
                    action.albumId,
                    action.title,
                    action.artist,
                    action.year,
                    action.genre,
                    action.noSongs,
                ],
                (_, result) => {
                    onSuccess();
                    console.log("Temporary action inserted successfully");
                },
                (_, error) => {
                    console.error("Error inserting temporary action:", error);
                    onError("Error inserting temporary action");
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};

export const getAllTemporaryActions = (callback, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "SELECT * FROM temporaryActions ORDER BY queueId ASC;",
                [],
                (_, result) => callback(result.rows._array),
                (_, error) => {
                    console.error("Error fetching temporary actions:", error);
                    onError("Error fetching temporary actions", error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};

export const deleteTemporaryAction = (id, onSuccess, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "DELETE FROM temporaryActions WHERE queueId=?;",
                [id],
                (_, result) => {
                    onSuccess();
                    console.log("Temporary action deleted successfully");
                },
                (_, error) => {
                    console.error("Error deleting temporary action:", error);
                    onError("Error deleting temporary action", error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};

export const deleteAllTemporaryActions = (onSuccess, onError) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "DELETE FROM temporaryActions;",
                [],
                (_, result) => {
                    onSuccess();
                    console.log("All temporary actions deleted successfully");
                },
                (_, error) => {
                    console.error("Error deleting temporary actions:", error);
                    onError("Error deleting temporary actions", error);
                }
            );
        },
        null,
        () => console.log("Transaction completed")
    );
};
