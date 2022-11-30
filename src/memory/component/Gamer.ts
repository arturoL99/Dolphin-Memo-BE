import Card from "./Card";
import GamerType from "./modelType/GamerType";

class Gamer {
  private id: string;

  private name: string;

  private avatar: string;

  private myTurn: boolean;

  private score: number;

  private room: string;

  private index: number;

  constructor(gamer: GamerType) {
    this.id = gamer.id;
    this.name = gamer.name;
    this.avatar = gamer.avatar;
    this.myTurn = gamer.myTurn;
    this.score = gamer.score;
    this.room = gamer.room;
    this.index = gamer.index;
  }

  pick(pickedCard: Card, pickedCard2: Card) {
    const cardCoupled = pickedCard.isSameCard(pickedCard2);
    if (cardCoupled) {
      this.score += 2;
      this.setMyTurn(true);
    } else {
      this.setMyTurn(false);
    }
    return cardCoupled;
  }

  setMyTurn(turn: boolean) {
    this.myTurn = turn;
  }

  getMyId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getMyAvatar() {
    return this.avatar;
  }

  setName(name: string) {
    this.name = name;
  }

  getMyTurn() {
    return this.myTurn;
  }

  setMyScore(score: number) {
    this.score = score;
  }

  getMyScore() {
    return this.score;
  }

  setRoom(room: string) {
    this.room = room;
  }

  getRoom() {
    return this.room;
  }

  getMyIndex() {
    return this.index;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      myTurn: this.myTurn,
      score: this.score,
      room: this.room,
      index: this.index,
    };
  }
}

export default Gamer;
