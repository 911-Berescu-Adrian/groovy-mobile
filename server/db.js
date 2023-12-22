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
    if (albums.length === 0) {
        newAlbum.albumId = 0;
    } else {
        newAlbum.albumId = Math.max(...albums.map((album) => album.albumId)) + 1;
    }
    albums.push(newAlbum);
    saveRepository();
    return { message: "Album added successfully" };
};

const updateAlbum = (updatedAlbum) => {
    const updatedAlbums = albums.map((album) => (album.albumId === updatedAlbum.albumId ? { ...updatedAlbum } : album));
    albums = updatedAlbums;
    saveRepository();
    return { message: "Album updated successfully" };
};

const deleteAlbum = (albumId) => {
    albums = albums.filter((album) => album.albumId !== albumId);
    saveRepository();
    return { message: "Album deleted successfully" };
};

module.exports = {
    initializeRepository,
    saveRepository,
    getAlbums,
    addAlbum,
    updateAlbum,
    deleteAlbum,
};
