"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("../memory/component/Card"));
it("is same Card", () => {
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
    const result = card.isSameCard(card2);
    expect(result === null || result === void 0 ? void 0 : result.getName()).toEqual(card.getName());
});
it("is NOT same Card", () => {
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
    const result = card.isSameCard(card2);
    expect(result).toEqual(undefined);
});
