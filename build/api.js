"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const GameUtils_1 = require("./util/GameUtils/GameUtils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const { v4: uuid } = require("uuid");
app.get("/games", (req, res) => {
    res.send(GameUtils_1.AllGames.getGames());
});
app.get("/games/:id", (req, res) => {
    const { id } = req.params;
    const game = GameUtils_1.AllGames.getGameById(id);
    console.log("API - GET GAME: ", game);
    if (!game)
        res.sendStatus(404);
    res.send(game === null || game === void 0 ? void 0 : game.toJson());
});
app.post("/games", (req, res) => {
    const id = uuid();
    const content = req.body;
    if (!content) {
        return res.sendStatus(400);
    }
    content.gameId = id;
    const game = GameUtils_1.AllGames.newGame(content);
    if (game) {
        console.log("API - CREATE NEW GAME");
        return res.send(game.toJson());
    }
    return res.sendStatus(400);
});
app.get("/public-games", (req, res) => {
    res.send(GameUtils_1.AllGames.getPublicGames());
});
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    res.send(GameUtils_1.AllGames.gameFinished(id));
});
exports.default = app;
