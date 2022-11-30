"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("../memory/component/Card"));
const Gamer_1 = __importDefault(require("../memory/component/Gamer"));
it("Gamer TURN is TRUE", () => {
    const gamer = new Gamer_1.default({
        id: "mari@mail",
        name: "Mari",
        avatar: "lion",
        score: 0,
        myTurn: true,
        room: "TEST",
        index: 0,
    });
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
    gamer.pick(card, card2);
    expect(gamer.getMyTurn()).toEqual(true);
    expect(gamer.getMyScore()).toEqual(2);
});
it("Gamer TURN is FALSE", () => {
    const gamer = new Gamer_1.default({
        id: "mari@mail",
        name: "Mari",
        avatar: "lion",
        score: 0,
        myTurn: true,
        room: "TEST",
        index: 0,
    });
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
    gamer.pick(card, card2);
    expect(gamer.getMyTurn()).toEqual(false);
    expect(gamer.getMyScore()).toEqual(0);
});
