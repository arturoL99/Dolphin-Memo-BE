import Card from "../memory/component/Card";
import ListCardType from "./ListCardType";

const ListCardsTest: Card[] = ListCardType.map((card) => new Card(card));

export default ListCardsTest;
