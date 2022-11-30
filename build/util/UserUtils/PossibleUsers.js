"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFreeAvatar = exports.possibleUsers = void 0;
exports.possibleUsers = [
    { name: "dog" },
    { name: "dolphin" },
    { name: "lion" },
    { name: "hat" },
];
const assignFreeAvatar = (usersConnected) => {
    var _a;
    const freeUsers = [...exports.possibleUsers];
    usersConnected.forEach((userConnected) => {
        const notFreeAvatarIndex = freeUsers.findIndex((avatar) => avatar.name === userConnected.getName());
        freeUsers.splice(notFreeAvatarIndex, 1);
    });
    return (_a = freeUsers.at(0)) === null || _a === void 0 ? void 0 : _a.name;
};
exports.assignFreeAvatar = assignFreeAvatar;
