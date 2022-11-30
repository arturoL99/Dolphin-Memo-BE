import CardType from "./CardType";
import DeckType from "./DeckType";
import GamerType from "./GamerType";

type GameType = {
  gameId: string;
  gameName: string;
  difficulty: string;
  gameMode: string;
  avatar: string;
  gameImg: string;
  deck: DeckType;
  nPartecipants: string;
  listGamers: GamerType[];
  listCard?: CardType[];
  gameStarted?: Boolean;
};

export default GameType;
