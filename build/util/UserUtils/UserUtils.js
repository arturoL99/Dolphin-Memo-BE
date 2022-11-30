"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUsersTest = exports.ActiveUsers = exports.AllUsers = void 0;
const Gamer_1 = __importDefault(require("../../memory/component/Gamer"));
const PossibleUsers_1 = require("./PossibleUsers");
class UserUtils {
    constructor() {
        this.users = [];
    }
    createUser(game, socketId) {
        const usersConnected = this.getUsersInRoom(game.gameId) || [];
        try {
            if (usersConnected.length >= parseInt(game.nPartecipants, 10)) {
                throw Error("Maximum number of players reached");
            }
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
        if (usersConnected.length === 0) {
            return new Gamer_1.default({
                id: socketId,
                name: game.avatar,
                avatar: game.avatar,
                myTurn: true,
                room: game.gameId,
                score: 0,
                index: 0,
            });
        }
        const avatar = (0, PossibleUsers_1.assignFreeAvatar)(usersConnected) || "name not found";
        return new Gamer_1.default({
            id: socketId,
            name: avatar,
            avatar,
            myTurn: false,
            room: game.gameId,
            score: 0,
            index: game.listGamers.length,
        });
    }
    updateUserByIdWithNewScore(userId, newScore, newTurn) {
        const user = this.getUser(userId);
        if (user) {
            user.setMyScore(newScore);
            user.setMyTurn(newTurn);
        }
        return user;
    }
    updateRoomForUser(userId, gameId) {
        const user = this.getUser(userId);
        if (user) {
            user.setRoom(gameId);
        }
        return user;
    }
    addNewUser(user) {
        const check = this.users.find((gamer) => gamer.getMyId() === user.getMyId());
        if (check)
            console.log("USER ID TAKEN");
        else
            this.users.push(user);
    }
    removeUser(id) {
        const index = this.getUsers().findIndex((user) => user.getMyId() === id);
        if (index !== -1) {
            const user = this.getUsers().at(index);
            this.getUsers().splice(index, 1);
            console.log(`removed user: ${id}`);
            return user;
        }
        console.log(`user id not found: ${id}`);
        return undefined;
    }
    getUsers() {
        return this.users;
    }
    setUsers(users) {
        this.users = users;
    }
    getUser(id) {
        return this.getUsers().find((user) => user.getMyId() === id);
    }
    getUsersInRoom(room) {
        return this.getUsers().filter((user) => user.getRoom() === room);
    }
}
exports.AllUsers = new UserUtils();
exports.ActiveUsers = new UserUtils();
exports.AllUsersTest = new UserUtils();
