import { data, testData1 } from "./data";
import { parseGameData } from "./utils";
const colorSet = ["red", "green", "blue"];
type ColorCountTuple = [number, number, number];

function getSumOfCubePowerPerGame(games: string[]): number {
  return games.reduce((acc, gameData, idx) => {
    const colorCountsThisGame: ColorCountTuple = [0, 0, 0];

    const { gameHints } = parseGameData(gameData, idx + 1);
    gameHints.forEach((hint) => {
      hint.forEach(({ count, color }) => {
        const colorIndex = colorSet.indexOf(color);
        if (Number(count) > colorCountsThisGame[colorIndex]) {
          colorCountsThisGame[colorIndex] = count;
        }
      });
    });

    const cubePower = colorCountsThisGame.reduce(
      (acc, colorCount) => acc * colorCount,
      1
    );

    return acc + cubePower;
  }, 0);
}

console.log(getSumOfCubePowerPerGame(testData1));
console.log(getSumOfCubePowerPerGame(data));
