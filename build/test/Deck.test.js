"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("../memory/component/Card"));
const Deck_1 = __importDefault(require("../memory/component/Deck"));
const Gamer_1 = __importDefault(require("../memory/component/Gamer"));
const ListCardType_1 = __importDefault(require("./ListCardType"));
it("should create a Deck with Shuffle Cards 8", () => {
    const listCard = [...ListCardType_1.default.slice(0, 4), ...ListCardType_1.default.slice(0, 4)];
    const deck = new Deck_1.default({
        listCard,
    });
    expect(deck.getListCard().length).toEqual(8);
});
it("should create a Deck with Shuffle Cards 16", () => {
    const listCard = [...ListCardType_1.default.slice(0, 8), ...ListCardType_1.default.slice(0, 8)];
    const deck = new Deck_1.default({
        listCard,
    });
    expect(deck.getListCard().length).toEqual(16);
});
it("should create a Deck with Shuffle Cards 24", () => {
    const listCard = [...ListCardType_1.default.slice(0, 12), ...ListCardType_1.default.slice(0, 12)];
    const deck = new Deck_1.default({
        listCard,
    });
    expect(deck.getListCard().length).toEqual(24);
});
it("should NOT update a Deck ", () => {
    const listCard = [...ListCardType_1.default.slice(0, 4), ...ListCardType_1.default.slice(0, 4)];
    const deck = new Deck_1.default({
        listCard,
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
    const gamer = new Gamer_1.default({
        id: "mari@mail",
        name: "Mari",
        avatar: "lion",
        myTurn: true,
        score: 0,
        room: "TEST",
        index: 0,
    });
    deck.update(gamer, card, card2);
    expect(deck.getCardsFound().length).toEqual(0);
});
it("should update a Deck with cardsFound = 1 ", () => {
    const listCard = [...ListCardType_1.default.slice(0, 4), ...ListCardType_1.default.slice(0, 4)];
    const deck = new Deck_1.default({
        listCard,
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
    const gamer = new Gamer_1.default({
        id: "mari@mail",
        name: "Mari",
        avatar: "lion",
        myTurn: true,
        score: 0,
        room: "TEST",
        index: 0,
    });
    deck.update(gamer, card, card2);
    expect(deck.getCardsFound().length).toEqual(1);
});
it("should update a Deck with cardsFound = 2 ", () => {
    const listCard = [...ListCardType_1.default.slice(0, 4), ...ListCardType_1.default.slice(0, 4)];
    const deck = new Deck_1.default({
        listCard,
    });
    const gamer = new Gamer_1.default({
        id: "mari@mail",
        name: "Mari",
        avatar: "lion",
        myTurn: true,
        score: 0,
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
    deck.update(gamer, card, card2);
    const card3 = new Card_1.default({
        id: "2",
        name: "2",
        img: "image 1.png",
        turned: false,
    });
    const card4 = new Card_1.default({
        id: "2",
        name: "2",
        img: "image 1.png",
        turned: false,
    });
    deck.update(gamer, card3, card4);
    expect(deck.getCardsFound().length).toEqual(2);
    expect(deck.getListCard().filter((cardIn) => cardIn.getTurned() === true).length).toEqual(4);
});
