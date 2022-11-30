"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = __importDefault(require("./Deck"));
const Gamer_1 = __importDefault(require("./Gamer"));
class Game {
    constructor(game) {
        this.gameId = game.gameId;
        this.gameName = game.gameName;
        this.difficulty = game.difficulty;
        this.gameMode = game.gameMode;
        this.avatar = game.avatar;
        this.gameImg = game.gameImg;
        this.deck = new Deck_1.default(game.deck);
        this.nPartecipants = game.nPartecipants;
        this.listGamers = game.listGamers.map((gamerType) => new Gamer_1.default(gamerType));
        this.gameStarted = game.gameStarted;
    }
    start(pickedCard1, pickedCard2) {
        const gamer = this.listGamers.find((gamerIn) => gamerIn.getMyTurn() === true);
        try {
            if (gamer) {
                this.deck.update(gamer, pickedCard1, pickedCard2);
                if (!gamer.getMyTurn())
                    this.nextPlayer(this.listGamers.indexOf(gamer));
            }
            else
                throw Error("Gamer not found");
        }
        catch (error) {
            console.log(error);
        }
        return gamer;
    }
    nextPlayer(index) {
        var _a;
        if (index === this.listGamers.length - 1) {
            index = -1;
        }
        (_a = this.listGamers.at(index + 1)) === null || _a === void 0 ? void 0 : _a.setMyTurn(true);
    }
    checkWinner() {
        var _a;
        const MAX_SCORE = this.deck.getListCard().length;
        let scoreAchieved = 0;
        this.listGamers.forEach((gamerIn) => {
            scoreAchieved += gamerIn.getMyScore();
        });
        if (scoreAchieved === MAX_SCORE ||
            this.getDeck().getCardsFound().length === MAX_SCORE / 2) {
            let max = 0;
            this.listGamers.forEach((gamerIn) => {
                if (max < gamerIn.getMyScore()) {
                    max = gamerIn.getMyScore();
                }
            });
            const winner = this.listGamers.filter((gamer) => gamer.getMyScore() === max);
            if (winner.length === 1) {
                return (_a = winner.at(0)) === null || _a === void 0 ? void 0 : _a.getMyAvatar();
            }
            if (winner.length > 1) {
                return "draw";
            }
        }
        return undefined;
    }
    removeUser(userIdRemove) {
        const posUserRemove = this.getListGamers().findIndex((gamer) => gamer.getMyId() === userIdRemove);
        this.getListGamers().splice(posUserRemove, 1);
    }
    getListGamers() {
        return this.listGamers;
    }
    setListGamers(listGamers) {
        this.listGamers = listGamers;
    }
    getId() {
        return this.gameId;
    }
    getName() {
        return this.gameName;
    }
    getMode() {
        return this.gameMode;
    }
    getDeck() {
        return this.deck;
    }
    getGameStarted() {
        return this.gameStarted;
    }
    setGameStarted(status) {
        this.gameStarted = status;
    }
    toJson() {
        return {
            gameId: this.gameId,
            gameName: this.gameName,
            difficulty: this.difficulty,
            gameMode: this.gameMode,
            avatar: this.avatar,
            gameImg: this.gameImg,
            deck: this.deck.toJson(),
            nPartecipants: this.nPartecipants,
            listGamers: this.listGamers.map((gamer) => gamer.toJson()),
            gameStarted: this.gameStarted,
        };
    }
}
exports.default = Game;
