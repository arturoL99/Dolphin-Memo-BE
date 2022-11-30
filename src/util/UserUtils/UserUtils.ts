import Game from "../../memory/component/Game";
import Gamer from "../../memory/component/Gamer";
import GameType from "../../memory/component/modelType/GameType";
import { assignFreeAvatar } from "./PossibleUsers";

class UserUtils {
  private users: Gamer[] = [];

  createUser(game: GameType, socketId: string): Gamer | undefined {
    const usersConnected: Gamer[] = this.getUsersInRoom(game.gameId) || [];
    try {
      if (usersConnected.length >= parseInt(game.nPartecipants, 10)) {
        throw Error("Maximum number of players reached");
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }

    if (usersConnected.length === 0) {
      return new Gamer({
        id: socketId,
        name: game.avatar,
        avatar: game.avatar,
        myTurn: true,
        room: game.gameId,
        score: 0,
        index: 0,
      });
    }
    const avatar = assignFreeAvatar(usersConnected) || "name not found";
    return new Gamer({
      id: socketId,
      name: avatar,
      avatar,
      myTurn: false,
      room: game.gameId,
      score: 0,
      index: game.listGamers.length,
    });
  }

  updateUserByIdWithNewScore(
    userId: Gamer["id"],
    newScore: number,
    newTurn: Gamer["myTurn"]
  ) {
    const user: Gamer | undefined = this.getUser(userId);
    if (user) {
      user.setMyScore(newScore);
      user.setMyTurn(newTurn);
    }
    return user;
  }

  updateRoomForUser(userId: Gamer["id"], gameId: Game["gameId"]) {
    const user: Gamer | undefined = this.getUser(userId);
    if (user) {
      user.setRoom(gameId);
    }
    return user;
  }

  addNewUser(user: Gamer) {
    const check = this.users.find(
      (gamer) => gamer.getMyId() === user.getMyId()
    );
    if (check) console.log("USER ID TAKEN");
    else this.users.push(user);
  }

  removeUser(id: string) {
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

  setUsers(users: Gamer[]) {
    this.users = users;
  }

  getUser(id: string) {
    return this.getUsers().find((user) => user.getMyId() === id);
  }

  getUsersInRoom(room: string) {
    return this.getUsers().filter((user) => user.getRoom() === room);
  }
}

export const AllUsers = new UserUtils();
export const ActiveUsers = new UserUtils();
export const AllUsersTest = new UserUtils();
