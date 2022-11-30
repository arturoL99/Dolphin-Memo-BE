"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "dolphin.m3mo@gmail.com",
        pass: "msfrsyisohmxwcjf",
    },
});
const mailOptions = (receivers, gameId) => {
    return {
        from: "dolphin.m3mo@gmail.com",
        to: receivers,
        subject: "Join Dolphin M3mo game",
        text: `Go to https://dolphin-demo.netlify.app/games/${gameId} to join the game.`,
    };
};
exports.mailOptions = mailOptions;
