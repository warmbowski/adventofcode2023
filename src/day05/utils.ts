export type AlmanacEntry = {
  name: string;
  sources: [number, number][];
  destinations: [number, number][];
};

export const loadMapData = (data: string[]) => {
  let currentKey = "";
  let keyCount = -1;
  let seeds: number[] = [];
  const almanac: AlmanacEntry[] = [];

  data.forEach((line: string) => {
    if (line === "") {
      currentKey = "";
    } else if (line.startsWith("seeds: ")) {
      seeds = line.replace("seeds: ", "").split(" ").map(Number);
    } else if (line.endsWith(" map:")) {
      keyCount++;
      currentKey = line.replace(" map:", "");
      almanac[keyCount] = {
        name: currentKey,
        sources: [],
        destinations: [],
      };
    } else {
      const [dest, source, length] = line.split(" ");
      const destinationStart = Number(dest);
      const destinationEnd = Number(dest) + Number(length) - 1;
      const sourceStart = Number(source);
      const sourceEnd = Number(source) + Number(length) - 1;
      almanac[keyCount].destinations.push([destinationStart, destinationEnd]);
      almanac[keyCount].sources.push([sourceStart, sourceEnd]);
    }
  });

  return { almanac, seeds };
};
