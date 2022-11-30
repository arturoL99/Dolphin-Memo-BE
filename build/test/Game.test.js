"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("../memory/component/Card"));
const Game_1 = __importDefault(require("../memory/component/Game"));
const GameTest_1 = require("./GameTest");
const ListCardsTest_1 = __importDefault(require("./ListCardsTest"));
it("After firstGamer error, gamer with id = 2 games", () => {
    var _a;
    const card = new Card_1.default({
        id: "1",
        name: "1",
        img: "image 1.png",
        turned: false,
    });
    const card2 = new Card_1.default({
        id: "2",
        name: "2",
        img: "image 2.png",
        turned: false,
    });
    const listCard = ListCardsTest_1.default.slice(0, 4);
    const game = new Game_1.default(GameTest_1.GameTest);
    game.start(card, card2);
    const gamerAfter = (_a = game
        .getListGamers()
        .find((gamerIn) => gamerIn.getMyTurn() === true)) === null || _a === void 0 ? void 0 : _a.getMyId();
    expect(gamerAfter).toEqual("2");
});
it("After secondGamer error, gamer with id = 3 games", () => {
    var _a, _b, _c;
    const card = new Card_1.default({
        id: "1",
        name: "1",
        img: "image 1.png",
        turned: false,
    });
    const card2 = new Card_1.default({
        id: "2",
        name: "2",
        img: "image 2.png",
        turned: false,
    });
    const listCard = ListCardsTest_1.default.slice(0, 4);
    const game = new Game_1.default(GameTest_1.GameTest);
    (_a = game.getListGamers().at(0)) === null || _a === void 0 ? void 0 : _a.setMyTurn(false);
    (_b = game.getListGamers().at(1)) === null || _b === void 0 ? void 0 : _b.setMyTurn(true);
    game.start(card, card2);
    const gamerAfter = (_c = game
        .getListGamers()
        .find((gamerIn) => gamerIn.getMyTurn() === true)) === null || _c === void 0 ? void 0 : _c.getMyId();
    expect(gamerAfter).toEqual("3");
});
it("After thirdGamer error, gamer with id = 4 games", () => {
    var _a, _b, _c;
    const card = new Card_1.default({
        id: "1",
        name: "1",
        img: "image 1.png",
        turned: false,
    });
    const card2 = new Card_1.default({
        id: "2",
        name: "2",
        img: "image 2.png",
        turned: false,
    });
    const listCard = ListCardsTest_1.default.slice(0, 4);
    const game = new Game_1.default(GameTest_1.GameTest);
    (_a = game.getListGamers().at(0)) === null || _a === void 0 ? void 0 : _a.setMyTurn(false);
    (_b = game.getListGamers().at(2)) === null || _b === void 0 ? void 0 : _b.setMyTurn(true);
    game.start(card, card2);
    const gamerAfter = (_c = game
        .getListGamers()
        .find((gamerIn) => gamerIn.getMyTurn() === true)) === null || _c === void 0 ? void 0 : _c.getMyId();
    expect(gamerAfter).toEqual("4");
});
it("After fourthGamer catchCouple, gamer with id = 4 games", () => {
    var _a, _b, _c;
    const card = new Card_1.default({
        id: "1",
        name: "1",
        img: "image 1.png",
        turned: false,
    });
    const card2 = new Card_1.default({
        id: "1",
        name: "1",
        img: "image 1.png",
        turned: false,
    });
    const listCard = ListCardsTest_1.default.slice(0, 4);
    const game = new Game_1.default(GameTest_1.GameTest);
    (_a = game.getListGamers().at(0)) === null || _a === void 0 ? void 0 : _a.setMyTurn(false);
    (_b = game.getListGamers().at(3)) === null || _b === void 0 ? void 0 : _b.setMyTurn(true);
    game.start(card, card2);
    const gamerAfter = (_c = game
        .getListGamers()
        .find((gamerIn) => gamerIn.getMyTurn() === true)) === null || _c === void 0 ? void 0 : _c.getMyId();
    expect(gamerAfter).toEqual("4");
});
it("FirstGamer win the game", () => {
    const listCard = ListCardsTest_1.default.slice(0, 4);
    const game = new Game_1.default(GameTest_1.GameTest);
    // const listPickedCard = ListCardsTest.slice(0, 4);
    // listPickedCard.forEach((card) => {
    //   game.start(card, card);
    // });
    const winner = game.checkWinner();
    expect(winner).toEqual("dolphin");
});
it("should be a draw", () => {
    const game = new Game_1.default(GameTest_1.GameTestDraw);
    const winner = game.checkWinner();
    expect(winner).toEqual("draw");
});
