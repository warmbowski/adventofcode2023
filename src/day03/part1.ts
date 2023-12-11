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
const checkForAdjacentSymbol = (
  schematic: string[],
  rowIdx: number,
  colIdx: number,
  offsetList: [number, number][]
) => {
  return offsetList.reduce((acc, offset) => {
    const r = rowIdx + offset[1];
    const c = colIdx + offset[0];
    const adjacent = schematic[r]?.[c] || ".";

    return acc || (adjacent !== "." && !isDigit(adjacent));
  }, false);
};

function getSumOfPartNumbers(schematic: string[]): number {
  const validPartNumbers: string[] = [];
  const invalidPartNumbers: string[] = [];

  schematic.forEach((line, rowIdx) => {
    let numStart: number | null = null;
    let numEnd: number | null = null;
    let hasNextNumber = false;
    let isPartNumber = false;

    for (let colIdx = 0; colIdx <= line.length; colIdx++) {
      if (isDigit(line[colIdx])) {
        if (numStart === null) {
          numStart = colIdx;
        }
        numEnd = colIdx;
        hasNextNumber = isDigit(line[colIdx + 1]);

        if (!isPartNumber) {
          isPartNumber = checkForAdjacentSymbol(
            schematic,
            rowIdx,
            colIdx,
            adjOffsets.sameCol
          );
        }
        if (!isPartNumber && numStart === numEnd) {
          isPartNumber = checkForAdjacentSymbol(
            schematic,
            rowIdx,
            colIdx,
            adjOffsets.prevCol
          );
        }
        if (
          !isPartNumber &&
          numStart !== null &&
          numEnd !== null &&
          !hasNextNumber
        ) {
          isPartNumber = checkForAdjacentSymbol(
            schematic,
            rowIdx,
            colIdx,
            adjOffsets.nextCol
          );
        }
      } else {
        if (numStart !== null && numEnd !== null && !isPartNumber) {
          invalidPartNumbers.push(line.slice(numStart, numEnd + 1));
        } else if (numStart !== null && numEnd !== null) {
          validPartNumbers.push(line.slice(numStart, numEnd + 1));
        }

        numStart = null;
        numEnd = null;
        hasNextNumber = false;
        isPartNumber = false;
      }
    }
  });

  return validPartNumbers.reduce((acc, cur) => acc + parseInt(cur), 0);
}

console.log(getSumOfPartNumbers(testData1));
console.log(getSumOfPartNumbers(data));
