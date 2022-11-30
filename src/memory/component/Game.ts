import Card from "./Card";
import Deck from "./Deck";
import Gamer from "./Gamer";
import GameType from "./modelType/GameType";

class Game {
  private gameId: string;

  private gameName: string;

  private difficulty: string;

  private gameMode: string;

  private avatar: string;

  private gameImg: string;

  private deck: Deck;

  private nPartecipants: string;

  private listGamers: Gamer[];

  private gameStarted: Boolean | undefined;

  constructor(game: GameType) {
    this.gameId = game.gameId;
    this.gameName = game.gameName;
    this.difficulty = game.difficulty;
    this.gameMode = game.gameMode;
    this.avatar = game.avatar;
    this.gameImg = game.gameImg;
    this.deck = new Deck(game.deck);
    this.nPartecipants = game.nPartecipants;
    this.listGamers = game.listGamers.map((gamerType) => new Gamer(gamerType));
    this.gameStarted = game.gameStarted;
  }

  start(pickedCard1: Card, pickedCard2: Card) {
    const gamer = this.listGamers.find(
      (gamerIn) => gamerIn.getMyTurn() === true
    );
    try {
      if (gamer) {
        this.deck.update(gamer, pickedCard1, pickedCard2);
        if (!gamer.getMyTurn()) this.nextPlayer(this.listGamers.indexOf(gamer));
      } else throw Error("Gamer not found");
    } catch (error) {
      console.log(error);
    }
    return gamer;
  }

  nextPlayer(index: number) {
    if (index === this.listGamers.length - 1) {
      index = -1;
    }
    this.listGamers.at(index + 1)?.setMyTurn(true);
  }

  checkWinner() {
    const MAX_SCORE = this.deck.getListCard().length;
    let scoreAchieved: number = 0;
    this.listGamers.forEach((gamerIn) => {
      scoreAchieved += gamerIn.getMyScore();
    });
    if (
      scoreAchieved === MAX_SCORE ||
      this.getDeck().getCardsFound().length === MAX_SCORE / 2
    ) {
      let max: number = 0;
      this.listGamers.forEach((gamerIn) => {
        if (max < gamerIn.getMyScore()) {
          max = gamerIn.getMyScore();
        }
      });
      const winner: Gamer[] = this.listGamers.filter(
        (gamer) => gamer.getMyScore() === max
      );
      if (winner.length === 1) {
        return winner.at(0)?.getMyAvatar();
      }
      if (winner.length > 1) {
        return "draw";
      }
    }
    return undefined;
  }

  removeUser(userIdRemove: string) {
    const posUserRemove: number = this.getListGamers().findIndex(
      (gamer: Gamer) => gamer.getMyId() === userIdRemove
    );
    this.getListGamers().splice(posUserRemove, 1);
  }

  getListGamers() {
    return this.listGamers;
  }

  setListGamers(listGamers: Gamer[]) {
    this.listGamers = listGamers;
  }

  getId() {
    return this.gameId;
  }

  getName() {
    return this.gameName;
  }

  getMode() {
    return this.gameMode;
  }

  getDeck() {
    return this.deck;
  }

  getGameStarted() {
    return this.gameStarted;
  }

  setGameStarted(status:Boolean) {
    this.gameStarted = status;
  }

  toJson() {
    return {
      gameId: this.gameId,
      gameName: this.gameName,
      difficulty: this.difficulty,
      gameMode: this.gameMode,
      avatar: this.avatar,
      gameImg: this.gameImg,
      deck: this.deck.toJson(),
      nPartecipants: this.nPartecipants,
      listGamers: this.listGamers.map((gamer) => gamer.toJson()),
      gameStarted: this.gameStarted,
    };
  }
}

export default Game;
