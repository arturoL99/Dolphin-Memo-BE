import Game from "../../memory/component/Game";
import Gamer from "../../memory/component/Gamer";
import GameType from "../../memory/component/modelType/GameType";
import { AllGames } from "../GameUtils/GameUtils";
import { ActiveUsers, AllUsers } from "../UserUtils/UserUtils";

export const updateGameWithReconnectedUser = (
  user: Gamer,
  userIndex: number
) => {
  const gameToUpdate: Game | undefined = AllGames.getGameById(user.getRoom());
  if (gameToUpdate) {
    gameToUpdate.getListGamers().splice(userIndex, 0, user);
    return AllGames.updateGame(gameToUpdate);
  }
  return undefined;
};

export const updateGameWithNewUser = (user: Gamer) => {
  const gameToUpdate: Game | undefined = AllGames.getGameById(user.getRoom());
  if (gameToUpdate) {
    gameToUpdate.getListGamers().push(user);
    return AllGames.updateGame(gameToUpdate);
  }
  return undefined;
};

export const addNewUserInAllUserAndInGame = (
  game: GameType,
  userId: Gamer["id"]
) => {
  const user: Gamer | undefined = ActiveUsers.createUser(game, userId);
  if (user) {
    ActiveUsers.getUsers().push(user);
    AllUsers.getUsers().push(user);
    return updateGameWithNewUser(user);
  }
  return undefined;
};

export const removeUserInActiveUsersAndUpdateGame = (userId: Gamer["id"]) => {
  const userRemove: Gamer | undefined = ActiveUsers.removeUser(userId);
  if (userRemove) {
    const gameToUpdate: Game | undefined = AllGames.getGameById(
      userRemove.getRoom()
    );
    gameToUpdate?.removeUser(userRemove.getMyId());
    if (gameToUpdate) {
      return AllGames.updateGame(gameToUpdate);
    }
  }
  return undefined;
};
