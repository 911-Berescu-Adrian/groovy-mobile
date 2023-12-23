const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "albums.json");

let albums = [];

const initializeRepository = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        albums = JSON.parse(data);
    } catch (error) {
        albums = [];
    }
};

const saveRepository = () => {
    const data = JSON.stringify(albums, null, 2);
    fs.writeFileSync(filePath, data, "utf-8");
};

const getAlbums = () => albums;

const addAlbum = (newAlbum) => {
    newAlbum.albumId = Math.random().toString(36).slice(2, 9);
    albums.push(newAlbum);
    saveRepository();
    console.log("From server: album added successfully");
    return { message: "From server: album added successfully" };
};

const updateAlbum = (updatedAlbum) => {
    const updatedAlbums = albums.map((album) => (album.albumId === updatedAlbum.albumId ? { ...updatedAlbum } : album));
    albums = updatedAlbums;
    saveRepository();
    console.log("From server: album updated successfully");
    return { message: "From server: album updated successfully" };
};

const deleteAlbum = (albumId) => {
    albums = albums.filter((album) => album.albumId !== albumId);
    saveRepository();
    console.log("From server: album deleted successfully");
    return { message: "From server: album deleted successfully" };
};

module.exports = {
    initializeRepository,
    saveRepository,
    getAlbums,
    addAlbum,
    updateAlbum,
    deleteAlbum,
};
