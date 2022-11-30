"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(card) {
        this.id = card.id;
        this.name = card.name;
        this.img = card.img;
        this.turned = card.turned;
    }
    isSameCard(card) {
        if (this.name === card.name) {
            return card;
        }
        return undefined;
    }
    getId() {
        return this.id;
    }
    getTurned() {
        return this.turned;
    }
    getName() {
        return this.name;
    }
    setTurned(turned) {
        this.turned = turned;
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            img: this.img,
            turned: this.turned,
        };
    }
}
exports.default = Card;
