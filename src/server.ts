import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import app from "./api";
import Card from "./memory/component/Card";
import Game from "./memory/component/Game";
import Gamer from "./memory/component/Gamer";
import ContentUpdateDeck from "./memory/component/modelType/ContentUpdateDeck";
import ContentUpdateUser from "./memory/component/modelType/ContentUpdateUser";
import GameType from "./memory/component/modelType/GameType";
import { AllGames } from "./util/GameUtils/GameUtils";
import { transporter, mailOptions } from "./util/MailUtils/MailUtils";
import {
  removeUserInActiveUsersAndUpdateGame,
  updateGameWithReconnectedUser,
  addNewUserInAllUserAndInGame,
} from "./util/SocketUtils/SocketUtils";
import { AllUsers, ActiveUsers } from "./util/UserUtils/UserUtils";

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
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
  const join = (game: GameType, userId: Gamer["id"]) => {
    socket.data.userId = userId;
    socket.join(game.gameId);
  };

  socket.on("new-user", (contentUpdateUser: ContentUpdateUser) => {
    const { game, userId } = contentUpdateUser;
    join(game, userId);
    const gameToUpdate: Game | undefined = addNewUserInAllUserAndInGame(
      game,
      userId
    );
    if (gameToUpdate)
      io.to(gameToUpdate.getId()).emit("updated-users", gameToUpdate.toJson());
  });

  socket.on("re-connection-user", (content: ContentUpdateUser) => {
    const { game, userId } = content;
    join(game, userId);
    const userInAllUser: Gamer | undefined = AllUsers.getUser(userId);
    const userInActiveUser: Gamer | undefined = ActiveUsers.getUser(userId);

    let gameToUpdate: Game | undefined;
    if (userInAllUser && userInAllUser.getRoom() !== game.gameId) {
      console.log("User in New Room");
      AllUsers.removeUser(userId);
      gameToUpdate = addNewUserInAllUserAndInGame(game, userId);
    } else if (userInAllUser && !userInActiveUser) {
      console.log("JOIN - User reconnecting");
      ActiveUsers.getUsers().push(userInAllUser);
      gameToUpdate = updateGameWithReconnectedUser(
        userInAllUser,
        userInAllUser.getMyIndex()
      );
    } else if (!userInActiveUser && !userInAllUser) {
      console.log("User With Id in localStorage");
      gameToUpdate = addNewUserInAllUserAndInGame(game, userId);
    } else {
      console.log("JOIN - User Active");
    }

    if (gameToUpdate) {
      console.log("GAME UPDATE: ", gameToUpdate);
      io.to(gameToUpdate.getId()).emit("updated-users", gameToUpdate.toJson());
    }
  });

  socket.on("game-started", (content: GameType) => {
    const game = new Game(content);
    const updatedGame = AllGames.updateGameStarted(game);
    if (updatedGame)
      io.to(updatedGame.getId()).emit("started-true", updatedGame.toJson());
  });

  socket.on("pick-a-card", (content: ContentUpdateDeck) => {
    if (content.pickedCard) {
      const game = new Game(content.game);
      game.getDeck().turnedACard(new Card(content.pickedCard));
      const updateGame: Game | undefined = AllGames.updateGame(game);
      if (updateGame) {
        content.game = updateGame.toJson();
        io.to(content.game.gameId).emit("return-pick-card", content);
      }
    }
  });

  socket.on("get-gamer-action", (content: ContentUpdateDeck) => {
    const game = new Game(content.game);
    const card = content.coupleCards?.firstCard
      ? new Card(content.coupleCards.firstCard)
      : undefined;
    const card2 = content.coupleCards?.secondCard
      ? new Card(content.coupleCards.secondCard)
      : undefined;

    if (card && card2) {
      const gamerToUpdate: Gamer | undefined = game.start(card, card2);
      if (gamerToUpdate)
        AllUsers.updateUserByIdWithNewScore(
          gamerToUpdate.getMyId(),
          gamerToUpdate.getMyScore(),
          gamerToUpdate.getMyTurn()
        );
    }
    const updateGame: Game | undefined = AllGames.updateGame(game);
    if (updateGame) {
      const result: ContentUpdateDeck = {
        game: updateGame.toJson(),
        winner: updateGame.checkWinner(),
      };
      io.to(content.game.gameId).emit("after-gamer-action", result);
    }
  });

  socket.on("invitation-mails", (mails, gameId) => {
    console.log(mails);
    mails.forEach((mail: string) => {
      if (mail !== "") {
        transporter.sendMail(mailOptions(mail, gameId), (err, success) => {
          if (err) {
            console.log(err);
          } else {
            console.log("email send successfully");
          }
        });
      }
    });
  });

  socket.on("remove-user", (content: ContentUpdateUser) => {
    const { userId } = content;
    const gameToUpdate: Game | undefined =
      removeUserInActiveUsersAndUpdateGame(userId);
    if (gameToUpdate) {
      io.to(gameToUpdate.getId()).emit("updated-users", gameToUpdate.toJson());
    }
  });

  socket.on("disconnect", () => {
    const gameUpdateAfterUserDisconnect: Game | undefined =
      removeUserInActiveUsersAndUpdateGame(socket.data.userId);
    if (gameUpdateAfterUserDisconnect)
      io.to(gameUpdateAfterUserDisconnect.getId()).emit(
        "updated-users",
        gameUpdateAfterUserDisconnect.toJson()
      );
    socket.disconnect();
  });
});

instrument(io, {
  auth: false,
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running in port ${PORT}`));
