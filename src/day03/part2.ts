import { data, testData1 } from "./data";
const numberRegex = /[0-9]/;
const adjOffsets: Record<string, [number, number][]> = {
  prevCol: [
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ],
  nextCol: [
    [1, 0],
    [1, 1],
    [1, -1],
  ],
  sameCol: [
    [0, 1],
    [0, -1],
  ],
};
const isDigit = (char: string) => numberRegex.test(char);
const getAdjacentStarCoords = (
  schematic: string[],
  rowIdx: number,
  colIdx: number,
  offsetList: [number, number][]
) => {
  const coordSet = offsetList.reduce<Set<string>>((acc, offset) => {
    const r = rowIdx + offset[1];
    const c = colIdx + offset[0];
    const adjacent = schematic[r]?.[c] || ".";
    const isStar = adjacent === "*";

    return isStar ? acc.add(`${r}, ${c}`) : acc;
  }, new Set());

  return [...coordSet];
};

function getSumOfGearRatios(schematic: string[]): number {
  const starMap = new Map<string, string[]>();

  schematic.forEach((line, rowIdx) => {
    let numStart: number | null = null;
    let numEnd: number | null = null;
    let hasNextNumber = false;
    let adjStarList: string[] = [];

    for (let colIdx = 0; colIdx <= line.length; colIdx++) {
      if (isDigit(line[colIdx])) {
        if (numStart === null) {
          numStart = colIdx;
        }
        numEnd = colIdx;
        hasNextNumber = isDigit(line[colIdx + 1]);

        adjStarList = [
          ...adjStarList,
          ...getAdjacentStarCoords(
            schematic,
            rowIdx,
            colIdx,
            adjOffsets.sameCol
          ),
        ];

        if (numStart === numEnd) {
          adjStarList = [
            ...adjStarList,
            ...getAdjacentStarCoords(
              schematic,
              rowIdx,
              colIdx,
              adjOffsets.prevCol
            ),
          ];
        }
        if (numStart !== null && numEnd !== null && !hasNextNumber) {
          adjStarList = [
            ...adjStarList,
            ...getAdjacentStarCoords(
              schematic,
              rowIdx,
              colIdx,
              adjOffsets.nextCol
            ),
          ];
        }
      } else {
        if (numStart !== null && numEnd !== null && adjStarList.length > 0) {
          const partNumber = line.slice(numStart, numEnd + 1);
          adjStarList.forEach((coord) => {
            starMap.set(coord, [...(starMap.get(coord) || []), partNumber]);
          });
          // console.log(starMap);
        }

        numStart = null;
        numEnd = null;
        hasNextNumber = false;
        adjStarList = [];
      }
    }
  });

  let sumOfGears = 0;
  const gears = [...starMap.values()].filter((star) => star.length > 1);
  gears.forEach((gear) => {
    if (gear.length > 2) {
      console.log("too many!", gear);
    }
    const ratio = gear.reduce((acc, cur) => {
      const num = parseInt(cur);
      return acc * num;
    }, 1);
    sumOfGears += ratio;
  });

  return sumOfGears;
}

console.log(getSumOfGearRatios(testData1));
console.log(getSumOfGearRatios(data));
