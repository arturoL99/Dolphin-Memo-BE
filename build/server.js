"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const admin_ui_1 = require("@socket.io/admin-ui");
const api_1 = __importDefault(require("./api"));
const Card_1 = __importDefault(require("./memory/component/Card"));
const Game_1 = __importDefault(require("./memory/component/Game"));
const GameUtils_1 = require("./util/GameUtils/GameUtils");
const MailUtils_1 = require("./util/MailUtils/MailUtils");
const SocketUtils_1 = require("./util/SocketUtils/SocketUtils");
const UserUtils_1 = require("./util/UserUtils/UserUtils");
const httpServer = http_1.default.createServer(api_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: [
            "https://admin.socket.io",
            "http://localhost:3000",
            "https://dolphin-demo.netlify.app",
        ],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    const join = (game, userId) => {
        socket.data.userId = userId;
        socket.join(game.gameId);
    };
    socket.on("new-user", (contentUpdateUser) => {
        const { game, userId } = contentUpdateUser;
        join(game, userId);
        const gameToUpdate = (0, SocketUtils_1.addNewUserInAllUserAndInGame)(game, userId);
        if (gameToUpdate)
            io.to(gameToUpdate.getId()).emit("updated-users", gameToUpdate.toJson());
    });
    socket.on("re-connection-user", (content) => {
        const { game, userId } = content;
        join(game, userId);
        const userInAllUser = UserUtils_1.AllUsers.getUser(userId);
        const userInActiveUser = UserUtils_1.ActiveUsers.getUser(userId);
        let gameToUpdate;
        if (userInAllUser && userInAllUser.getRoom() !== game.gameId) {
            console.log("User in New Room");
            UserUtils_1.AllUsers.removeUser(userId);
            gameToUpdate = (0, SocketUtils_1.addNewUserInAllUserAndInGame)(game, userId);
        }
        else if (userInAllUser && !userInActiveUser) {
            console.log("JOIN - User reconnecting");
            UserUtils_1.ActiveUsers.getUsers().push(userInAllUser);
            gameToUpdate = (0, SocketUtils_1.updateGameWithReconnectedUser)(userInAllUser, userInAllUser.getMyIndex());
        }
        else if (!userInActiveUser && !userInAllUser) {
            console.log("User With Id in localStorage");
            gameToUpdate = (0, SocketUtils_1.addNewUserInAllUserAndInGame)(game, userId);
        }
        else {
            console.log("JOIN - User Active");
        }
        if (gameToUpdate) {
            console.log("GAME UPDATE: ", gameToUpdate);
            io.to(gameToUpdate.getId()).emit("updated-users", gameToUpdate.toJson());
        }
    });
    socket.on("game-started", (content) => {
        const game = new Game_1.default(content);
        const updatedGame = GameUtils_1.AllGames.updateGameStarted(game);
        if (updatedGame)
            io.to(updatedGame.getId()).emit("started-true", updatedGame.toJson());
    });
    socket.on("pick-a-card", (content) => {
        if (content.pickedCard) {
            const game = new Game_1.default(content.game);
            game.getDeck().turnedACard(new Card_1.default(content.pickedCard));
            const updateGame = GameUtils_1.AllGames.updateGame(game);
            if (updateGame) {
                content.game = updateGame.toJson();
                io.to(content.game.gameId).emit("return-pick-card", content);
            }
        }
    });
    socket.on("get-gamer-action", (content) => {
        var _a, _b;
        const game = new Game_1.default(content.game);
        const card = ((_a = content.coupleCards) === null || _a === void 0 ? void 0 : _a.firstCard)
            ? new Card_1.default(content.coupleCards.firstCard)
            : undefined;
        const card2 = ((_b = content.coupleCards) === null || _b === void 0 ? void 0 : _b.secondCard)
            ? new Card_1.default(content.coupleCards.secondCard)
            : undefined;
        if (card && card2) {
            const gamerToUpdate = game.start(card, card2);
            if (gamerToUpdate)
                UserUtils_1.AllUsers.updateUserByIdWithNewScore(gamerToUpdate.getMyId(), gamerToUpdate.getMyScore(), gamerToUpdate.getMyTurn());
        }
        const updateGame = GameUtils_1.AllGames.updateGame(game);
        if (updateGame) {
            const result = {
                game: updateGame.toJson(),
                winner: updateGame.checkWinner(),
            };
            io.to(content.game.gameId).emit("after-gamer-action", result);
        }
    });
    socket.on("invitation-mails", (mails, gameId) => {
        console.log(mails);
        mails.forEach((mail) => {
            if (mail !== "") {
                MailUtils_1.transporter.sendMail((0, MailUtils_1.mailOptions)(mail, gameId), (err, success) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("email send successfully");
                    }
                });
            }
        });
    });
    socket.on("remove-user", (content) => {
        const { userId } = content;
        const gameToUpdate = (0, SocketUtils_1.removeUserInActiveUsersAndUpdateGame)(userId);
        if (gameToUpdate) {
            io.to(gameToUpdate.getId()).emit("updated-users", gameToUpdate.toJson());
        }
    });
    socket.on("disconnect", () => {
        const gameUpdateAfterUserDisconnect = (0, SocketUtils_1.removeUserInActiveUsersAndUpdateGame)(socket.data.userId);
        if (gameUpdateAfterUserDisconnect)
            io.to(gameUpdateAfterUserDisconnect.getId()).emit("updated-users", gameUpdateAfterUserDisconnect.toJson());
        socket.disconnect();
    });
});
(0, admin_ui_1.instrument)(io, {
    auth: false,
});
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running in port ${PORT}`));
