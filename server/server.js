const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

app.get("/", (req, res) => res.send("yo world"));

wss.on("connection", (ws) => {
    console.log("A user connected");

    ws.on("message", (message) => {
        const decodedMessage = message.toString("utf-8");
        console.log("received: ", decodedMessage);
        ws.send(`gotchu ${decodedMessage}`);
    });

    ws.send("Welcome to the server!");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
