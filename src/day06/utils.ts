export type Races = {
  times: number[];
  distances: number[];
};

export const loadRaceLists = (data: string[]): Races => {
  let times: number[] = [];
  let distances: number[] = [];

  data.forEach((line: string) => {
    const [label, ...values] = line.trim().replace(/\s\s+/g, " ").split(" ");

    times = label === "Time:" ? values.map(Number) : times;
    distances = label === "Distance:" ? values.map(Number) : distances;
  });

  if (times.length !== distances.length) {
    throw new Error(
      `times.length (${times.length}) and distances.length (${distances.length}) must be the same`
    );
  }

  return {
    times,
    distances,
  };
};

export const loadSingleRace = (data: string[]): Races => {
  let times: number[] = [];
  let distances: number[] = [];

  data.forEach((line: string) => {
    const [label, value] = line.trim().replace(/\s\s+/g, "").split(":");

    times = label === "Time" ? [Number(value)] : times;
    distances = label === "Distance" ? [Number(value)] : distances;
  });

  if (times.length !== distances.length) {
    throw new Error(
      `times.length (${times.length}) and distances.length (${distances.length}) must be the same`
    );
  }

  return {
    times,
    distances,
  };
};
