"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserInActiveUsersAndUpdateGame = exports.addNewUserInAllUserAndInGame = exports.updateGameWithNewUser = exports.updateGameWithReconnectedUser = void 0;
const GameUtils_1 = require("../GameUtils/GameUtils");
const UserUtils_1 = require("../UserUtils/UserUtils");
const updateGameWithReconnectedUser = (user, userIndex) => {
    const gameToUpdate = GameUtils_1.AllGames.getGameById(user.getRoom());
    if (gameToUpdate) {
        gameToUpdate.getListGamers().splice(userIndex, 0, user);
        return GameUtils_1.AllGames.updateGame(gameToUpdate);
    }
    return undefined;
};
exports.updateGameWithReconnectedUser = updateGameWithReconnectedUser;
const updateGameWithNewUser = (user) => {
    const gameToUpdate = GameUtils_1.AllGames.getGameById(user.getRoom());
    if (gameToUpdate) {
        gameToUpdate.getListGamers().push(user);
        return GameUtils_1.AllGames.updateGame(gameToUpdate);
    }
    return undefined;
};
exports.updateGameWithNewUser = updateGameWithNewUser;
const addNewUserInAllUserAndInGame = (game, userId) => {
    const user = UserUtils_1.ActiveUsers.createUser(game, userId);
    if (user) {
        UserUtils_1.ActiveUsers.getUsers().push(user);
        UserUtils_1.AllUsers.getUsers().push(user);
        return (0, exports.updateGameWithNewUser)(user);
    }
    return undefined;
};
exports.addNewUserInAllUserAndInGame = addNewUserInAllUserAndInGame;
const removeUserInActiveUsersAndUpdateGame = (userId) => {
    const userRemove = UserUtils_1.ActiveUsers.removeUser(userId);
    if (userRemove) {
        const gameToUpdate = GameUtils_1.AllGames.getGameById(userRemove.getRoom());
        gameToUpdate === null || gameToUpdate === void 0 ? void 0 : gameToUpdate.removeUser(userRemove.getMyId());
        if (gameToUpdate) {
            return GameUtils_1.AllGames.updateGame(gameToUpdate);
        }
    }
    return undefined;
};
exports.removeUserInActiveUsersAndUpdateGame = removeUserInActiveUsersAndUpdateGame;
