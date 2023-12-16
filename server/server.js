const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const { initializeRepository, getAlbums, addAlbum, deleteAlbum, updateAlbum } = require("./db");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });
app.use(bodyParser.json());

initializeRepository();

const broadcastUpdate = () => {
    const albums = getAlbums();
    const updateMessage = JSON.stringify({ type: "update", data: albums });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(updateMessage);
        }
    });
};

app.get("/", (req, res) => res.send("yo world"));

app.get("/album", (req, res) => {
    res.json(getAlbums());
});

app.post("/album", (req, res) => {
    const newAlbum = req.body;
    const result = addAlbum(newAlbum);
    broadcastUpdate();
    res.json(result);
});

app.delete("/album/:albumId", (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const result = deleteAlbum(albumId);
    broadcastUpdate();
    res.json(result);
});

app.patch("/album/:albumId", (req, res) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.body;
    const result = updateAlbum(albumId, album);
    broadcastUpdate();
    res.json(result);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
