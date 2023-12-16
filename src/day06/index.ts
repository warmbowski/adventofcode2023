import { data, testData1 } from "./data";
import { getCountOfWaysToWin } from "./part1";
import { loadRaceLists, loadSingleRace } from "./utils";

const racesT = loadRaceLists(testData1);
const racesD = loadRaceLists(data);
console.log(
  "part 1 test",
  getCountOfWaysToWin(racesT.times, racesT.distances),
  "should equal 288"
);
console.log("part 1 data", getCountOfWaysToWin(racesD.times, racesD.distances));

const raceT = loadSingleRace(testData1);
const raceD = loadSingleRace(data);
console.log(
  "part 2 test",
  getCountOfWaysToWin(raceT.times, raceT.distances),
  "should equal 71503"
);
console.log("part 2 data", getCountOfWaysToWin(raceD.times, raceD.distances));
