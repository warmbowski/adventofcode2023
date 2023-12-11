import { data, testData1 } from "./data";
import { parseCardData } from "./utils";

function getCountOfMultiplyingScratchCards(cards: string[]): number {
  const cardCountsList: number[] = new Array(cards.length).fill(1);

  cards.forEach((cardData, idx) => {
    const { cardNumbers, winningNumbers } = parseCardData(cardData, idx + 1);
    const countOfWinningNumbers = cardNumbers.filter((cardNumber) => {
      return winningNumbers.includes(cardNumber);
    }).length;

    for (
      let i = 1;
      i <= countOfWinningNumbers && i < cardCountsList.length;
      i++
    ) {
      cardCountsList[idx + i] += 1 * cardCountsList[idx];
    }
  });

  return cardCountsList.reduce((acc, cardCount) => acc + cardCount, 0);
}

console.log(getCountOfMultiplyingScratchCards(testData1));
console.log(getCountOfMultiplyingScratchCards(data));
