import { data, testData2 } from "./data";
const wordNumMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
// This regex doesn't capture overlapping matches!! Dont use it!
// const pattern = /one|two|three|four|five|six|seven|eight|nine|zero/g
const patterns = Object.keys(wordNumMap).map((word) => new RegExp(word, "g"));

function getSumOfCalibrationCodesDigitsOrWords(data: string[]): number {
  return data.reduce((acc, code) => {
    const codeArrayWithNans = code.split("").map((char) => Number(char));

    patterns.forEach((pattern) => {
      const matches = code.matchAll(pattern);
      for (const m of matches) {
        if (m.index !== undefined) {
          codeArrayWithNans[m.index] = wordNumMap[m[0]];
        }
      }
    });

    const codeArray = codeArrayWithNans.filter((num) => !isNaN(num));
    const tens = (codeArray[0] || 0) * 10;
    const ones = codeArray[codeArray.length - 1] || 0;
    return acc + tens + ones;
  }, 0);
}

console.log(getSumOfCalibrationCodesDigitsOrWords(testData2));
console.log(getSumOfCalibrationCodesDigitsOrWords(data));
