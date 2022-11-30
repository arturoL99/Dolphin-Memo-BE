"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gamer {
    constructor(gamer) {
        this.id = gamer.id;
        this.name = gamer.name;
        this.avatar = gamer.avatar;
        this.myTurn = gamer.myTurn;
        this.score = gamer.score;
        this.room = gamer.room;
        this.index = gamer.index;
    }
    pick(pickedCard, pickedCard2) {
        const cardCoupled = pickedCard.isSameCard(pickedCard2);
        if (cardCoupled) {
            this.score += 2;
            this.setMyTurn(true);
        }
        else {
            this.setMyTurn(false);
        }
        return cardCoupled;
    }
    setMyTurn(turn) {
        this.myTurn = turn;
    }
    getMyId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getMyAvatar() {
        return this.avatar;
    }
    setName(name) {
        this.name = name;
    }
    getMyTurn() {
        return this.myTurn;
    }
    setMyScore(score) {
        this.score = score;
    }
    getMyScore() {
        return this.score;
    }
    setRoom(room) {
        this.room = room;
    }
    getRoom() {
        return this.room;
    }
    getMyIndex() {
        return this.index;
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
            myTurn: this.myTurn,
            score: this.score,
            room: this.room,
            index: this.index,
        };
    }
}
exports.default = Gamer;
