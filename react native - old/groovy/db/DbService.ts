import * as SQLite from "expo-sqlite";
import { Album } from "../model/Album";

const db = SQLite.openDatabase("db.db");

class DbService {
    static resetDb() {
        db.transaction((tx) => {
            tx.executeSql("drop table albums");
        });
    }
    static initDatabase() {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS albums (albumId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT, year INTEGER, genre TEXT, noSongs INTEGER)",
                [],
                (_, result) => {
                    console.log("Table created successfully");
                }
            );
        });
    }

    static addAlbum(
        title: string,
        artist: string,
        year: number,
        genre: string,
        noSongs: number
    ) {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO albums (title, artist, year, genre, noSongs) VALUES (?, ?, ?, ?, ?)",
                [title, artist, year, genre, noSongs],
                (_, result) => {
                    console.log("Data inserted successfully");
                }
            );
        });
    }

    static getAllAlbums(callback: (albums: Album[]) => void) {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "SELECT * FROM albums;",
                    [],
                    (_, result) => {
                        const albums: Album[] = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            albums.push(result.rows.item(i));
                        }
                        callback(albums);
                    },
                    (_, error) => {
                        console.error("Error retrieving data: ", error);
                        return true; // Return true to indicate that the error has been handled
                    }
                );
            },
            undefined, // Omit success callback
            undefined // Omit error callback
        );
    }
}

export default DbService;
