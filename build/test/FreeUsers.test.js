"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gamer_1 = __importDefault(require("../memory/component/Gamer"));
const PossibleUsers_1 = require("../util/UserUtils/PossibleUsers");
it("The Avatar Assigned is the first free avatar", () => {
    const userConnected = [
        new Gamer_1.default({
            id: "TEST",
            name: "dog",
            avatar: "dog",
            myTurn: true,
            room: "TEST",
            score: 0,
            index: 0,
        }),
    ];
    const freeAvatar = (0, PossibleUsers_1.assignFreeAvatar)(userConnected);
    expect(freeAvatar).toEqual("dolphin");
});
it("The User Assigned have to be different", () => {
    const userConnected = [
        new Gamer_1.default({
            id: "TEST",
            name: "dolphin",
            avatar: "dolphin",
            myTurn: true,
            room: "TEST",
            score: 0,
            index: 0,
        }),
    ];
    const freeAvatar = (0, PossibleUsers_1.assignFreeAvatar)(userConnected);
    expect(freeAvatar).toEqual("dog");
});
it("Assign Free Avatar when there are 2 gamers", () => {
    const userConnected = [
        new Gamer_1.default({
            id: "TEST",
            name: "dog",
            avatar: "dog",
            myTurn: true,
            room: "TEST",
            score: 0,
            index: 0,
        }),
        new Gamer_1.default({
            id: "TEST",
            name: "dolphin",
            avatar: "dolphin",
            myTurn: true,
            room: "TEST",
            score: 0,
            index: 0,
        }),
    ];
    const freeAvatar = (0, PossibleUsers_1.assignFreeAvatar)(userConnected);
    expect(freeAvatar).toEqual("lion");
});
it("Assign Free Avatar when there are 2 gamers", () => {
    const userConnected = [
        new Gamer_1.default({
            id: "TEST",
            name: "lion",
            avatar: "lion",
            myTurn: true,
            room: "TEST",
            score: 0,
            index: 0,
        }),
        new Gamer_1.default({
            id: "TEST",
            name: "dog",
            avatar: "dog",
            myTurn: true,
            room: "TEST",
            score: 0,
            index: 0,
        }),
    ];
    const freeAvatar = (0, PossibleUsers_1.assignFreeAvatar)(userConnected);
    expect(freeAvatar).toEqual("dolphin");
});
