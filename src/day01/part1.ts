import { data, testData1 } from "./data";

function getSumOfCalibrationCodesDigits(data: string[]): number {
  return data.reduce((acc, code) => {
    const codeArray = code
      .split("")
      .map((char) => Number(char))
      .filter((num) => !isNaN(num));
    const tens = (codeArray[0] || 0) * 10;
    const ones = codeArray[codeArray.length - 1] || 0;
    return acc + tens + ones;
  }, 0);
}

console.log(getSumOfCalibrationCodesDigits(testData1));
console.log(getSumOfCalibrationCodesDigits(data));
