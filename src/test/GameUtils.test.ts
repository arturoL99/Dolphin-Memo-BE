import Game from "../memory/component/Game";
import CardType from "../memory/component/modelType/CardType";
import DeckType from "../memory/component/modelType/DeckType";
import { AllGamesTest } from "../util/GameUtils/GameUtils";
import { GameTest } from "./GameTest";
import ListCardType from "./ListCardType";

it("should create a ListCard With Shuffle CardType passing a number", () => {
  const listCard: CardType[] | null = AllGamesTest.createShuffleDeck(
    ListCardType,
    4
  );
  let preId: string = "";
  let isSameId: boolean = false;
  if (listCard) {
    listCard.forEach((card) => {
      if (card.id === preId) {
        isSameId = true;
      }
      preId = card.id;
    });
    expect(isSameId).toEqual(false);
    expect(listCard.length).toEqual(8);
  }
});

// it("should create a Error because number parameter is not with enum value", () => {
//   expect(() => {
//     AllGamesTest.createShuffleDeck(ListCardType, 10);
//   }).toThrow("Not Valid ListCard");
// });

it("should update a game passing a data-game", () => {
  AllGamesTest.setGames([new Game(GameTest)]);

  const data = GameTest;
  const deck: DeckType = {
    listCard: ListCardType.slice(0, 12),
    cardsFound: [],
  };
  data.deck = deck;

  AllGamesTest.updateGame(new Game(data));
  expect(AllGamesTest.getGames().at(0)?.getId()).toEqual("p342042");
  expect(AllGamesTest.getGames().at(0)?.getDeck().toJson()).toEqual(deck);
});
