import Card from "./Card";
import Gamer from "./Gamer";
import DeckType from "./modelType/DeckType";

class Deck {
  private listCard: Card[];

  private cardsFound: Card[];

  constructor(deck: DeckType) {
    this.listCard = deck.listCard.map((cardType) => new Card(cardType));
    this.cardsFound = deck.cardsFound
      ? deck.cardsFound.map((cardType) => new Card(cardType))
      : [];
  }

  catchCouples(gamer: Gamer, card: Card, card2: Card) {
    const cardCoupled = gamer.pick(card, card2);
    if (cardCoupled) {
      this.cardsFound.push(cardCoupled);
    }
  }

  turnedACard(cardPicked: Card) {
    this.listCard
      .find((card) => card.getId() === cardPicked.getId())
      ?.setTurned(true);
  }

  setFalseAllCards() {
    this.listCard.forEach((card) => card.setTurned(false));
  }

  update(gamer: Gamer, card: Card, card2: Card) {
    this.catchCouples(gamer, card, card2);
    this.setFalseAllCards();
    this.listCard.forEach((cardIn) => {
      this.cardsFound.forEach((cardFound) => {
        if (cardIn.getName() === cardFound.getName()) {
          cardIn.setTurned(true);
        }
      });
    });
  }

  setListCard(listCard: Card[]) {
    this.listCard = listCard;
  }

  setCardsFound(cardsFound: Card[]) {
    this.cardsFound = cardsFound;
  }

  getListCard() {
    return this.listCard;
  }

  getCardsFound() {
    return this.cardsFound;
  }

  toJson() {
    return {
      listCard: this.listCard.map((card) => card.toJson()),
      cardsFound: this.cardsFound.map((card) => card.toJson()),
    };
  }
}

export default Deck;
