import { data, testData1 } from "./data";
import { processASeedThroughAlmanac } from "./part1";
import { AlmanacEntry, loadMapData } from "./utils";

const getSeedRanges = (seeds: number[]) => {
  let seedRanges: [number, number][] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const length = seeds[i + 1];
    seedRanges.push([start, start + length - 1]);
  }
  return seedRanges;
};

const processSeedRangesThroughAlmanac = (
  almanac: AlmanacEntry[],
  seedRanges: [number, number][]
) => {
  const processedSeedRangeResults = seedRanges.map((seedRange, idx) => {
    console.log(
      `processing seed range ${idx + 1} of ${seedRanges.length} (size ${
        seedRange[1] - seedRange[0] + 1
      }))`
    );
    const start = Date.now();
    let length = seedRange[1] - seedRange[0];
    let offset = 0;
    let smallestResult: number = Infinity;

    while (length > 1) {
      const currentResult = processASeedThroughAlmanac(
        seedRange[0] + offset,
        almanac
      );

      if (currentResult < smallestResult) {
        smallestResult = currentResult;
        length = length / 2;
        offset += length;
      } else {
        length = length / 2;
        offset -= length;
      }
    }

    const end = Date.now();
    console.log(`processed seed range ${idx + 1} in ${end - start}ms`);
    console.log(`smallest result: ${smallestResult}`);

    return smallestResult;
  });

  return Math.min(...processedSeedRangeResults);
};

const { almanac: almanacT, seeds: seedsT } = loadMapData(testData1);
const { almanac: almanacD, seeds: seedsD } = loadMapData(data);
console.log(processSeedRangesThroughAlmanac(almanacT, getSeedRanges(seedsT)));
console.log(processSeedRangesThroughAlmanac(almanacD, getSeedRanges(seedsD)));

// Vague note to self:
// This was a brute force attempt looking at the mappings of each seed in all ranges.
// This took about 35 min to run on my machine. I think the better way would be to
// somehow invert the logic so that we iterate over mappings to get ranges. Then we
// can just take the lowest value of the lowest range.
