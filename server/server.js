const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeRepository, getAlbums, addAlbum, deleteAlbum, updateAlbum } = require("./db");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

app.use(cors());
app.use(bodyParser.json());

initializeRepository();

const broadcastUpdate = (type, change) => {
    const updateMessage = JSON.stringify({ type: type, data: change });

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
    console.log("RECEIVED", req.body);
    const newAlbum = req.body;
    const result = addAlbum(newAlbum);
    broadcastUpdate("create", newAlbum);
    res.json(result);
});

app.delete("/album/:albumId", (req, res) => {
    const albumId = req.params.albumId;
    const result = deleteAlbum(albumId);
    console.log(albumId);
    broadcastUpdate("remove", albumId);
    res.json(result);
});

app.put("/album", (req, res) => {
    const album = req.body;
    console.log(req.body);
    const result = updateAlbum(album);
    broadcastUpdate("update", album);
    res.json(result);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
