import Gamer from "../Gamer";
import CardType from "./CardType";
import CoupleCards from "./CoupleCards";
import GameType from "./GameType";

type ContentUpdateDeck = {
  game: GameType;
  coupleCards?: CoupleCards;
  pickedCard?: CardType;
  winner?: string | undefined;
};

export default ContentUpdateDeck;
