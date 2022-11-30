import cors from "cors";
import express from "express";
import Game from "./memory/component/Game";
import GameType from "./memory/component/modelType/GameType";
import { AllGames } from "./util/GameUtils/GameUtils";
import { AllUsers, ActiveUsers } from "./util/UserUtils/UserUtils";

const app = express();
app.use(cors());
app.use(express.json());

const { v4: uuid } = require("uuid");

app.get("/games", (req, res) => {
  res.send(AllGames.getGames());
});

app.get("/games/:id", (req, res) => {
  const { id } = req.params;
  const game: Game | undefined = AllGames.getGameById(id);
  console.log("API - GET GAME: ", game);
  if (!game) res.sendStatus(404);
  res.send(game?.toJson());
});

app.post("/games", (req, res) => {
  const id = uuid();
  const content: GameType = req.body;
  if (!content) {
    return res.sendStatus(400);
  }
  content.gameId = id;
  const game: Game | undefined = AllGames.newGame(content);
  if (game) {
    console.log("API - CREATE NEW GAME");
    return res.send(game.toJson());
  }
  return res.sendStatus(400);
});

app.get("/public-games", (req, res) => {
  res.send(AllGames.getPublicGames());
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  res.send(AllGames.gameFinished(id));
});

export default app;
