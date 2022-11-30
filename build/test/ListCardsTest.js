"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("../memory/component/Card"));
const ListCardType_1 = __importDefault(require("./ListCardType"));
const ListCardsTest = ListCardType_1.default.map((card) => new Card_1.default(card));
exports.default = ListCardsTest;
