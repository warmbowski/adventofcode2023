export function getCountOfWaysToWin(
  times: number[],
  distances: number[]
): number {
  const winnerCounts: number[] = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let winnerCount = 0;

    for (let t = time; t >= 0; t--) {
      const holdTime = t; // ms
      const runTime = time - holdTime; // ms
      const speed = holdTime; // mm/ms
      const runDistance = speed * runTime; // mm

      if (runDistance > distance) {
        winnerCount++;
      }
    }

    winnerCounts.push(winnerCount);
  }

  return winnerCounts.reduce((acc, curr) => acc * curr, 1);
}
