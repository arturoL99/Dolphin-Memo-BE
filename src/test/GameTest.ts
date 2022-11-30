import GameType from "../memory/component/modelType/GameType";
import ListCardType from "./ListCardType";

export const GameTest: GameType = {
  gameId: "p342042",
  gameName: "TEST",
  difficulty: "4",
  gameMode: "Private",
  avatar: "Mari",
  gameImg: "image1.png",
  deck: {
    listCard: [...ListCardType.slice(0, 4), ...ListCardType.slice(0, 4)],
  },
  nPartecipants: "4",
  listGamers: [
    {
      id: "1",
      name: "Mari",
      avatar: "dolphin",
      myTurn: true,
      score: 4,
      room: "TEST",
      index: 0,
    },
    {
      id: "2",
      name: "Arturo",
      avatar: "hat",
      myTurn: false,
      score: 2,
      room: "TEST",
      index: 1,
    },
    {
      id: "3",
      name: "Sasha",
      avatar: "lion",
      myTurn: false,
      score: 2,
      room: "TEST",
      index: 2,
    },
    {
      id: "4",
      name: "Anonimo",
      avatar: "dog",
      myTurn: false,
      score: 0,
      room: "TEST",
      index: 3,
    },
  ],
};

export const GameTestDraw: GameType = {
  gameId: "p342042",
  gameName: "TEST",
  difficulty: "4",
  gameMode: "Private",
  avatar: "Mari",
  gameImg: "image1.png",
  deck: {
    listCard: [...ListCardType.slice(0, 4), ...ListCardType.slice(0, 4)],
  },
  nPartecipants: "4",
  listGamers: [
    {
      id: "1",
      name: "Mari",
      avatar: "dolphin",
      myTurn: true,
      score: 4,
      room: "TEST",
      index: 0,
    },
    {
      id: "2",
      name: "Arturo",
      avatar: "hat",
      myTurn: false,
      score: 4,
      room: "TEST",
      index: 1,
    },
    {
      id: "3",
      name: "Sasha",
      avatar: "lion",
      myTurn: false,
      score: 0,
      room: "TEST",
      index: 2,
    },
    {
      id: "4",
      name: "Anonimo",
      avatar: "dog",
      myTurn: false,
      score: 0,
      room: "TEST",
      index: 3,
    },
  ],
};
