import { data, testData1 } from "./data";
import { AlmanacEntry, loadMapData } from "./utils";

export function processASeedThroughAlmanac(
  seed: number,
  almanac: AlmanacEntry[]
) {
  let processResult: number = seed;

  for (let s = 0; s < almanac.length; s++) {
    const step = almanac[s];
    const { sources, destinations } = step;
    const sourceIdx = sources.findIndex(
      ([start, end]) => processResult >= start && processResult <= end
    );
    const sourceRange = sources[sourceIdx];
    const destinationRange = destinations[sourceIdx];
    if (sourceRange && destinationRange) {
      const [sourceStart] = sourceRange;
      const [destinationStart] = destinationRange;
      const offset = processResult - sourceStart;
      const destinationNumber = destinationStart + offset;

      processResult = destinationNumber;
    }
  }

  return processResult;
}

export function processAllSeedsThroughAlmanac(
  almanac: AlmanacEntry[],
  seeds: number[]
): number {
  let smallestResult: number = Infinity;

  seeds.forEach((seed) => {
    const currentResult = processASeedThroughAlmanac(seed, almanac);

    smallestResult = Math.min(smallestResult, currentResult);
  });

  return smallestResult;
}

const { almanac: almanacT, seeds: seedsT } = loadMapData(testData1);
const { almanac: almanacD, seeds: seedsD } = loadMapData(data);
console.log(processAllSeedsThroughAlmanac(almanacT, seedsT));
console.log(processAllSeedsThroughAlmanac(almanacD, seedsD));

// almanac.forEach((step) => {
//   const { sources, destinations } = step;
//   const sourceIdx = sources.findIndex(
//     ([start, end]) => processResult >= start && processResult <= end
//   );
//   const sourceRange = sources[sourceIdx];
//   const destinationRange = destinations[sourceIdx];
//   if (sourceRange && destinationRange) {
//     const [sourceStart] = sourceRange;
//     const [destinationStart] = destinationRange;
//     const offset = processResult - sourceStart;
//     const destinationNumber = destinationStart + offset;

//     processResult = destinationNumber;
//   }
// });

// smallestResult = Math.min(smallestResult, processResult);
