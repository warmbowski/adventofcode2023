import { data, testData1 } from "./data";
import { rankAllHandsAndGetTotalWinnings } from "./part1";

console.log(
  "part 1 test",
  rankAllHandsAndGetTotalWinnings(testData1),
  "should equal 6440"
);
console.log("part 1 data", rankAllHandsAndGetTotalWinnings(data));

console.log(
  "part 2 test",
  rankAllHandsAndGetTotalWinnings(testData1, "J23456789TQKA", "J"),
  "should equal 5905"
);
console.log(
  "part 2 data",
  rankAllHandsAndGetTotalWinnings(data, "J23456789TQKA", "J")
);
