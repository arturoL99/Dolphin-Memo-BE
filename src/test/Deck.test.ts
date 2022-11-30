import Card from "../memory/component/Card";
import Deck from "../memory/component/Deck";
import Gamer from "../memory/component/Gamer";
import ListCardType from "./ListCardType";

it("should create a Deck with Shuffle Cards 8", () => {
  const listCard = [...ListCardType.slice(0, 4), ...ListCardType.slice(0, 4)];
  const deck: Deck = new Deck({
    listCard,
  });
  expect(deck.getListCard().length).toEqual(8);
});

it("should create a Deck with Shuffle Cards 16", () => {
  const listCard = [...ListCardType.slice(0, 8), ...ListCardType.slice(0, 8)];
  const deck: Deck = new Deck({
    listCard,
  });
  expect(deck.getListCard().length).toEqual(16);
});

it("should create a Deck with Shuffle Cards 24", () => {
  const listCard = [...ListCardType.slice(0, 12), ...ListCardType.slice(0, 12)];
  const deck: Deck = new Deck({
    listCard,
  });
  expect(deck.getListCard().length).toEqual(24);
});

it("should NOT update a Deck ", () => {
  const listCard = [...ListCardType.slice(0, 4), ...ListCardType.slice(0, 4)];
  const deck: Deck = new Deck({
    listCard,
  });

  const card = new Card({
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

  const gamer: Gamer = new Gamer({
    id: "mari@mail",
    name: "Mari",
    avatar: "lion",
    myTurn: true,
    score: 0,
    room: "TEST",
    index: 0,
  });

  deck.update(gamer, card, card2);
  expect(deck.getCardsFound().length).toEqual(0);
});

it("should update a Deck with cardsFound = 1 ", () => {
  const listCard = [...ListCardType.slice(0, 4), ...ListCardType.slice(0, 4)];
  const deck: Deck = new Deck({
    listCard,
  });

  const card = new Card({
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

  const gamer: Gamer = new Gamer({
    id: "mari@mail",
    name: "Mari",
    avatar: "lion",
    myTurn: true,
    score: 0,
    room: "TEST",
    index: 0,
  });

  deck.update(gamer, card, card2);
  expect(deck.getCardsFound().length).toEqual(1);
});

it("should update a Deck with cardsFound = 2 ", () => {
  const listCard = [...ListCardType.slice(0, 4), ...ListCardType.slice(0, 4)];
  const deck: Deck = new Deck({
    listCard,
  });

  const gamer: Gamer = new Gamer({
    id: "mari@mail",
    name: "Mari",
    avatar: "lion",
    myTurn: true,
    score: 0,
    room: "TEST",
    index: 0,
  });

  const card = new Card({
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

  deck.update(gamer, card, card2);

  const card3 = new Card({
    id: "2",
    name: "2",
    img: "image 1.png",
    turned: false,
  });

  const card4: Card = new Card({
    id: "2",
    name: "2",
    img: "image 1.png",
    turned: false,
  });

  deck.update(gamer, card3, card4);
  expect(deck.getCardsFound().length).toEqual(2);
  expect(
    deck.getListCard().filter((cardIn) => cardIn.getTurned() === true).length
  ).toEqual(4);
});
