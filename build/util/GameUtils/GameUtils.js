"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllGamesTest = exports.AllGames = void 0;
const DifficultyGame_1 = __importDefault(require("../../memory/component/DifficultyGame"));
const Game_1 = __importDefault(require("../../memory/component/Game"));
class GameUtils {
    constructor() {
        this.games = [];
    }
    createShuffleDeck(listCardFromForm, difficulty) {
        try {
            if (!listCardFromForm || !DifficultyGame_1.default[difficulty]) {
                throw Error("Not Valid ListCard");
            }
            const listCard = listCardFromForm.slice(0, difficulty);
            const shuffleListCard = [...listCard, ...listCard].sort(() => Math.random() - 0.5);
            return shuffleListCard.map((cardType, index) => ({
                id: String(index),
                name: cardType.name,
                img: cardType.img,
                turned: cardType.turned,
            }));
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    newGame(data) {
        const listCard = this.createShuffleDeck(data.listCard, parseInt(data.difficulty, 10));
        if (listCard) {
            data.deck.listCard = listCard;
            const game = new Game_1.default(data);
            this.games.push(game);
            return game;
        }
        return undefined;
    }
    updateGame(game) {
        const gameToUpdate = this.getGameById(game.getId());
        try {
            if (!gameToUpdate) {
                console.log(gameToUpdate);
                throw Error(`Game with id: ${game.getId()} NOT found`);
            }
        }
        catch (error) {
            console.log(error);
        }
        if (gameToUpdate) {
            gameToUpdate.setListGamers(game.getListGamers());
            gameToUpdate.getDeck().setListCard(game.getDeck().getListCard());
            gameToUpdate.getDeck().setCardsFound(game.getDeck().getCardsFound());
        }
        return gameToUpdate;
    }
    updateGameStarted(game) {
        const gameToUpdate = this.getGameById(game.getId());
        try {
            if (!gameToUpdate) {
                console.log(gameToUpdate);
                throw Error(`Game with id: ${game.getId()} NOT found`);
            }
        }
        catch (error) {
            console.log(error);
        }
        if (gameToUpdate) {
            gameToUpdate.setGameStarted(true);
        }
        return gameToUpdate;
    }
    setGames(games) {
        this.games = games;
    }
    getGames() {
        return this.games;
    }
    getPublicGames() {
        return this.games.filter((game) => game.getMode() === "Public");
    }
    getGameById(gameId) {
        return this.games.find((game) => game.getId() === gameId);
    }
    getGameByName(gameName) {
        return this.games.find((game) => game.getName() === gameName);
    }
    gameFinished(id) {
        const gameIndex = this.games.findIndex((game) => game.getId() === id);
        this.games.splice(gameIndex, 1);
    }
    setUsers(game, users) {
        game.setListGamers(users);
    }
}
exports.AllGames = new GameUtils();
exports.AllGamesTest = new GameUtils();
