export const parseGameData = (line: string, lineNo?: number) => {
  try {
    const [game, value] = line.split(": "); // ["Game 3", "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"]
    const [_, gameId] = game.trim().split(" "); // ["Game", "3"]
    const gameHintList = value.trim().split("; "); // ["8 green, 6 blue, 20 red", "5 blue, 4 red, 13 green", "5 green, 1 red"]
    const gameHints = gameHintList.map((hint) => {
      // hint = "8 green, 6 blue, 20 red"
      const colorCounts = hint
        .split(", ") // ["8 green", "6 blue", "20 red"]
        .map((tile) => {
          // tile = "8 green" => ["8", "green"]
          const [count, color] = tile.trim().split(" ");
          return { count: Number(count), color };
        });
      return colorCounts; // [{count: 8, color: "green"}, {count: 6, color: "blue"}, {count: 20, color: "red"}]
    });

    return { gameId: Number(gameId), gameHints };
  } catch (error) {
    console.log(`Data parsing failed on this line:`);
    console.log(`${lineNo ? lineNo : "-"}: "${line}"`);
    console.log("Check the format of the data.");
    throw error;
  }
};
