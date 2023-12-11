import { data, testData1 } from "./data";
import { parseGameData } from "./utils";

const startingCubeSet = {
  red: 12,
  green: 13,
  blue: 14,
};

function getSumOfPossibleGames(
  games: string[],
  cubeSet: Record<string, number>
): number {
  return games.reduce((acc, gameData, idx) => {
    let gameStatus: "possible" | "impossible" | null = null;

    const { gameId, gameHints } = parseGameData(gameData, idx + 1);
    gameHints.forEach((hint) => {
      hint.forEach(({ count, color }) => {
        if (gameStatus !== "impossible" && count <= cubeSet[color]) {
          gameStatus = "possible";
        } else {
          gameStatus = "impossible";
        }
      });
    });

    return gameStatus === "possible" ? acc + gameId : acc;
  }, 0);
}

console.log(getSumOfPossibleGames(testData1, startingCubeSet));
console.log(getSumOfPossibleGames(data, startingCubeSet));
