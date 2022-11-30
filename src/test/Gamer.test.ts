import Card from "../memory/component/Card";
import Gamer from "../memory/component/Gamer";

it("Gamer TURN is TRUE", () => {
  const gamer: Gamer = new Gamer({
    id: "mari@mail",
    name: "Mari",
    avatar: "lion",
    score: 0,
    myTurn: true,
    room: "TEST",
    index: 0,
  });

  const card: Card = new Card({
    id: "1",
    name: "1",
    img: "image 1.png",
    turned: false,
  });

  const card2: Card = new Card({
    id: "1",
    name: "1",
    img: "image 1.png",
    turned: false,
  });

  gamer.pick(card, card2);
  expect(gamer.getMyTurn()).toEqual(true);
  expect(gamer.getMyScore()).toEqual(2);
});

it("Gamer TURN is FALSE", () => {
  const gamer: Gamer = new Gamer({
    id: "mari@mail",
    name: "Mari",
    avatar: "lion",
    score: 0,
    myTurn: true,
    room: "TEST",
    index: 0,
  });

  const card: Card = new Card({
    id: "1",
    name: "1",
    img: "image 1.png",
    turned: false,
  });

  const card2: Card = new Card({
    id: "2",
    name: "2",
    img: "image 2.png",
    turned: false,
  });

  gamer.pick(card, card2);
  expect(gamer.getMyTurn()).toEqual(false);
  expect(gamer.getMyScore()).toEqual(0);
});
