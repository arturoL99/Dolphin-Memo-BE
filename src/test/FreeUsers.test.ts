import Gamer from "../memory/component/Gamer";
import { assignFreeAvatar } from "../util/UserUtils/PossibleUsers";

it("The Avatar Assigned is the first free avatar", () => {
  const userConnected = [
    new Gamer({
      id: "TEST",
      name: "dog",
      avatar: "dog",
      myTurn: true,
      room: "TEST",
      score: 0,
      index: 0,
    }),
  ];

  const freeAvatar = assignFreeAvatar(userConnected);
  expect(freeAvatar).toEqual("dolphin");
});

it("The User Assigned have to be different", () => {
  const userConnected = [
    new Gamer({
      id: "TEST",
      name: "dolphin",
      avatar: "dolphin",
      myTurn: true,
      room: "TEST",
      score: 0,
      index: 0,
    }),
  ];

  const freeAvatar = assignFreeAvatar(userConnected);
  expect(freeAvatar).toEqual("dog");
});

it("Assign Free Avatar when there are 2 gamers", () => {
  const userConnected = [
    new Gamer({
      id: "TEST",
      name: "dog",
      avatar: "dog",
      myTurn: true,
      room: "TEST",
      score: 0,
      index: 0,
    }),
    new Gamer({
      id: "TEST",
      name: "dolphin",
      avatar: "dolphin",
      myTurn: true,
      room: "TEST",
      score: 0,
      index: 0,
    }),
  ];

  const freeAvatar = assignFreeAvatar(userConnected);
  expect(freeAvatar).toEqual("lion");
});

it("Assign Free Avatar when there are 2 gamers", () => {
  const userConnected = [
    new Gamer({
      id: "TEST",
      name: "lion",
      avatar: "lion",
      myTurn: true,
      room: "TEST",
      score: 0,
      index: 0,
    }),
    new Gamer({
      id: "TEST",
      name: "dog",
      avatar: "dog",
      myTurn: true,
      room: "TEST",
      score: 0,
      index: 0,
    }),
  ];

  const freeAvatar = assignFreeAvatar(userConnected);
  expect(freeAvatar).toEqual("dolphin");
});
