import { data, testData1 } from "./data";
import { parseCardData } from "./utils";

function getTotalValueOfScratchCards(cards: string[]): number {
  return cards.reduce((acc, cardData, idx) => {
    const { cardNumbers, winningNumbers } = parseCardData(cardData, idx + 1);
    const cardNumbersInWinningNumbers = cardNumbers.filter((cardNumber) => {
      return winningNumbers.includes(cardNumber);
    });
    const valueOfCard = cardNumbersInWinningNumbers.length
      ? 2 ** (cardNumbersInWinningNumbers.length - 1)
      : 0;
    return acc + valueOfCard;
  }, 0);
}

console.log(getTotalValueOfScratchCards(testData1));
console.log(getTotalValueOfScratchCards(data));
