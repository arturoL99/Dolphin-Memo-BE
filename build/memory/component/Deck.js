"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./Card"));
class Deck {
    constructor(deck) {
        this.listCard = deck.listCard.map((cardType) => new Card_1.default(cardType));
        this.cardsFound = deck.cardsFound
            ? deck.cardsFound.map((cardType) => new Card_1.default(cardType))
            : [];
    }
    catchCouples(gamer, card, card2) {
        const cardCoupled = gamer.pick(card, card2);
        if (cardCoupled) {
            this.cardsFound.push(cardCoupled);
        }
    }
    turnedACard(cardPicked) {
        var _a;
        (_a = this.listCard
            .find((card) => card.getId() === cardPicked.getId())) === null || _a === void 0 ? void 0 : _a.setTurned(true);
    }
    setFalseAllCards() {
        this.listCard.forEach((card) => card.setTurned(false));
    }
    update(gamer, card, card2) {
        this.catchCouples(gamer, card, card2);
        this.setFalseAllCards();
        this.listCard.forEach((cardIn) => {
            this.cardsFound.forEach((cardFound) => {
                if (cardIn.getName() === cardFound.getName()) {
                    cardIn.setTurned(true);
                }
            });
        });
    }
    setListCard(listCard) {
        this.listCard = listCard;
    }
    setCardsFound(cardsFound) {
        this.cardsFound = cardsFound;
    }
    getListCard() {
        return this.listCard;
    }
    getCardsFound() {
        return this.cardsFound;
    }
    toJson() {
        return {
            listCard: this.listCard.map((card) => card.toJson()),
            cardsFound: this.cardsFound.map((card) => card.toJson()),
        };
    }
}
exports.default = Deck;
