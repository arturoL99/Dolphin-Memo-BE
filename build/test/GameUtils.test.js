"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("../memory/component/Game"));
const GameUtils_1 = require("../util/GameUtils/GameUtils");
const GameTest_1 = require("./GameTest");
const ListCardType_1 = __importDefault(require("./ListCardType"));
it("should create a ListCard With Shuffle CardType passing a number", () => {
    const listCard = GameUtils_1.AllGamesTest.createShuffleDeck(ListCardType_1.default, 4);
    let preId = "";
    let isSameId = false;
    if (listCard) {
        listCard.forEach((card) => {
            if (card.id === preId) {
                isSameId = true;
            }
            preId = card.id;
        });
        expect(isSameId).toEqual(false);
        expect(listCard.length).toEqual(8);
    }
});
// it("should create a Error because number parameter is not with enum value", () => {
//   expect(() => {
//     AllGamesTest.createShuffleDeck(ListCardType, 10);
//   }).toThrow("Not Valid ListCard");
// });
it("should update a game passing a data-game", () => {
    var _a, _b;
    GameUtils_1.AllGamesTest.setGames([new Game_1.default(GameTest_1.GameTest)]);
    const data = GameTest_1.GameTest;
    const deck = {
        listCard: ListCardType_1.default.slice(0, 12),
        cardsFound: [],
    };
    data.deck = deck;
    GameUtils_1.AllGamesTest.updateGame(new Game_1.default(data));
    expect((_a = GameUtils_1.AllGamesTest.getGames().at(0)) === null || _a === void 0 ? void 0 : _a.getId()).toEqual("p342042");
    expect((_b = GameUtils_1.AllGamesTest.getGames().at(0)) === null || _b === void 0 ? void 0 : _b.getDeck().toJson()).toEqual(deck);
});
