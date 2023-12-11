export const parseCardData = (line: string, lineNo?: number) => {
  try {
    const [card, value] = line.split(": ");
    const [_, cardId] = card.trim().replace(/\s\s+/g, " ").split(" ");
    const [winningNumbersString, cardNumbersString] = value.trim().split("|");
    const winningNumbers = winningNumbersString
      .trim()
      .replace(/\s\s+/g, " ")
      .split(" ")
      .map(Number);
    const cardNumbers = cardNumbersString
      .trim()
      .replace(/\s\s+/g, " ")
      .split(" ")
      .map(Number);
    return { cardId: Number(cardId), winningNumbers, cardNumbers };
  } catch (error) {
    console.log(`Data parsing failed on this line:`);
    console.log(`${lineNo ? lineNo : "-"}: "${line}"`);
    console.log("Check the format of the data.");
    throw error;
  }
};
