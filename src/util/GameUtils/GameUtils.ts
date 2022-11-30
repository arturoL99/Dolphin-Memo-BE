import DifficultyGame from "../../memory/component/DifficultyGame";
import Game from "../../memory/component/Game";
import CardType from "../../memory/component/modelType/CardType";
import GameType from "../../memory/component/modelType/GameType";

class GameUtils {
  private games: Game[] = [];

  createShuffleDeck(
    listCardFromForm: CardType[] | undefined,
    difficulty: number
  ): CardType[] | null {
    try {
      if (!listCardFromForm || !DifficultyGame[difficulty]) {
        throw Error("Not Valid ListCard");
      }
      const listCard: CardType[] = listCardFromForm.slice(0, difficulty);
      const shuffleListCard: CardType[] = [...listCard, ...listCard].sort(
        () => Math.random() - 0.5
      );
      return shuffleListCard.map((cardType, index) => ({
        id: String(index),
        name: cardType.name,
        img: cardType.img,
        turned: cardType.turned,
      }));
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  newGame(data: GameType) {
    const listCard = this.createShuffleDeck(
      data.listCard,
      parseInt(data.difficulty, 10)
    );
    if (listCard) {
      data.deck.listCard = listCard;
      const game: Game = new Game(data);
      this.games.push(game);
      return game;
    }
    return undefined;
  }

  updateGame(game: Game) {
    const gameToUpdate: Game | undefined = this.getGameById(game.getId());
    try {
      if (!gameToUpdate) {
        console.log(gameToUpdate);
        throw Error(`Game with id: ${game.getId()} NOT found`);
      }
    } catch (error) {
      console.log(error);
    }
    if (gameToUpdate) {
      gameToUpdate.setListGamers(game.getListGamers());
      gameToUpdate.getDeck().setListCard(game.getDeck().getListCard());
      gameToUpdate.getDeck().setCardsFound(game.getDeck().getCardsFound());
    }
    return gameToUpdate;
  }

  updateGameStarted(game: Game) {
    const gameToUpdate: Game | undefined = this.getGameById(game.getId());
    try {
      if (!gameToUpdate) {
        console.log(gameToUpdate);
        throw Error(`Game with id: ${game.getId()} NOT found`);
      }
    } catch (error) {
      console.log(error);
    }
    if (gameToUpdate) {
      gameToUpdate.setGameStarted(true);
    }
    return gameToUpdate;
  }

  setGames(games: Game[]) {
    this.games = games;
  }

  getGames() {
    return this.games;
  }

  getPublicGames() {
    return this.games.filter((game: Game) => game.getMode() === "Public");
  }

  getGameById(gameId: string) {
    return this.games.find((game: Game) => game.getId() === gameId);
  }

  getGameByName(gameName: string) {
    return this.games.find((game: Game) => game.getName() === gameName);
  }

  gameFinished(id: string) {
    const gameIndex = this.games.findIndex((game: Game) => game.getId() === id);
    this.games.splice(gameIndex, 1);
  }

  setUsers(game: Game, users: any) {
    game.setListGamers(users);
  }
}

export const AllGames = new GameUtils();

export const AllGamesTest = new GameUtils();
