enum lowToHighHandRanks {
  highCard,
  onePair,
  twoPair,
  threeOfAKind,
  fullHouse,
  fourOfAKind,
  fiveOfAKind,
}

function getHandRank(hand: string, wildCard: string): number {
  const handInventory = hand
    .split("")
    .reduce<Record<string, number>>((acc, card) => {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      return acc;
    }, {});

  const wildCount = handInventory[wildCard] || 0;
  delete handInventory[wildCard];

  const cardCounts = Object.values(handInventory).sort((a, b) => b - a);

  if (cardCounts[0] === undefined) return lowToHighHandRanks.fiveOfAKind; // all wild cards
  if (cardCounts[0] + wildCount === 5) return lowToHighHandRanks.fiveOfAKind;
  if (cardCounts[0] + wildCount === 4) return lowToHighHandRanks.fourOfAKind;
  if (cardCounts[0] + cardCounts[1] + wildCount === 5)
    return lowToHighHandRanks.fullHouse;
  if (cardCounts[0] + wildCount === 3) return lowToHighHandRanks.threeOfAKind;
  if (cardCounts[0] + cardCounts[1] + wildCount === 4)
    return lowToHighHandRanks.twoPair;
  if (cardCounts[0] + wildCount === 2) return lowToHighHandRanks.onePair;
  return lowToHighHandRanks.highCard;
}

export function rankAllHandsAndGetTotalWinnings(
  handList: string[],
  cardRanks: string = "23456789TJQKA",
  wildCard: string = ""
) {
  const sortedHands = handList
    .map((handInfo) => {
      const [hand, score] = handInfo.split(" ");
      const handRank = getHandRank(hand, wildCard);

      return { hand, handRank, score: parseInt(score, 10) };
    })
    .sort((a, b) => {
      if (a.handRank === b.handRank) {
        let i = 0;
        while (a.hand[i] === b.hand[i]) {
          i++;
        }
        return cardRanks.indexOf(a.hand[i]) - cardRanks.indexOf(b.hand[i]);
      } else {
        return a.handRank - b.handRank;
      }
    });

  return sortedHands.reduce((acc, hand, idx) => {
    return acc + hand.score * (idx + 1);
  }, 0);
}
