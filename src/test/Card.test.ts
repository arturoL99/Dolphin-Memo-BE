import Card from "../memory/component/Card";

it("is same Card", () => {
  const card: Card = new Card({
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

  const result = card.isSameCard(card2);
  expect(result?.getName()).toEqual(card.getName());
});

it("is NOT same Card", () => {
  const card: Card = new Card({
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

  const result = card.isSameCard(card2);
  expect(result).toEqual(undefined);
});
