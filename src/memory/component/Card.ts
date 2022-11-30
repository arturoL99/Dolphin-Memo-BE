import CardType from "./modelType/CardType";

class Card {
  private id: string;

  private name: string;

  private img: string;

  private turned: boolean;

  constructor(card: CardType) {
    this.id = card.id;
    this.name = card.name;
    this.img = card.img;
    this.turned = card.turned;
  }

  isSameCard(card: Card) {
    if (this.name === card.name) {
      return card;
    }
    return undefined;
  }

  getId() {
    return this.id;
  }

  getTurned() {
    return this.turned;
  }

  getName() {
    return this.name;
  }

  setTurned(turned: boolean) {
    this.turned = turned;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      img: this.img,
      turned: this.turned,
    };
  }
}

export default Card;
