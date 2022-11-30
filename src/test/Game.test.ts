import Card from "../memory/component/Card";
import Game from "../memory/component/Game";
import { GameTest, GameTestDraw } from "./GameTest";
import ListCardsTest from "./ListCardsTest";

it("After firstGamer error, gamer with id = 2 games", () => {
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

  const listCard: Card[] = ListCardsTest.slice(0, 4);
  const game: Game = new Game(GameTest);

  game.start(card, card2);
  const gamerAfter = game
    .getListGamers()
    .find((gamerIn) => gamerIn.getMyTurn() === true)
    ?.getMyId();
  expect(gamerAfter).toEqual("2");
});

it("After secondGamer error, gamer with id = 3 games", () => {
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

  const listCard: Card[] = ListCardsTest.slice(0, 4);
  const game: Game = new Game(GameTest);
  game.getListGamers().at(0)?.setMyTurn(false);
  game.getListGamers().at(1)?.setMyTurn(true);
  game.start(card, card2);
  const gamerAfter = game
    .getListGamers()
    .find((gamerIn) => gamerIn.getMyTurn() === true)
    ?.getMyId();
  expect(gamerAfter).toEqual("3");
});

it("After thirdGamer error, gamer with id = 4 games", () => {
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

  const listCard: Card[] = ListCardsTest.slice(0, 4);
  const game: Game = new Game(GameTest);
  game.getListGamers().at(0)?.setMyTurn(false);
  game.getListGamers().at(2)?.setMyTurn(true);
  game.start(card, card2);
  const gamerAfter = game
    .getListGamers()
    .find((gamerIn) => gamerIn.getMyTurn() === true)
    ?.getMyId();
  expect(gamerAfter).toEqual("4");
});

it("After fourthGamer catchCouple, gamer with id = 4 games", () => {
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

  const listCard: Card[] = ListCardsTest.slice(0, 4);
  const game: Game = new Game(GameTest);
  game.getListGamers().at(0)?.setMyTurn(false);
  game.getListGamers().at(3)?.setMyTurn(true);
  game.start(card, card2);
  const gamerAfter = game
    .getListGamers()
    .find((gamerIn) => gamerIn.getMyTurn() === true)
    ?.getMyId();
  expect(gamerAfter).toEqual("4");
});

it("FirstGamer win the game", () => {
  const listCard: Card[] = ListCardsTest.slice(0, 4);
  const game: Game = new Game(GameTest);

  // const listPickedCard = ListCardsTest.slice(0, 4);
  // listPickedCard.forEach((card) => {
  //   game.start(card, card);
  // });
  const winner = game.checkWinner();
  expect(winner).toEqual("dolphin");
});

it("should be a draw", () => {
  const game: Game = new Game(GameTestDraw);

  const winner = game.checkWinner();
  expect(winner).toEqual("draw");
});
