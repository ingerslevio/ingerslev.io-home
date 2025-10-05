import type { Race } from "../types/race";

// Import all race data files dynamically
const raceModules = import.meta.glob("../content/races/*.ts", { eager: true });

export async function getAllRaces(): Promise<Race[]> {
  const races: Race[] = [];

  for (const path in raceModules) {
    const module = raceModules[path] as { raceData: Race };
    if (module.raceData) {
      races.push(module.raceData);
    }
  }

  return races;
}

export async function getUpcomingRaces(): Promise<Race[]> {
  const races = await getAllRaces();
  return races
    .filter((race) => race.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function getPastRaces(): Promise<Race[]> {
  const races = await getAllRaces();
  return races
    .filter((race) => race.status === "completed")
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getRaceById(id: string): Promise<Race | undefined> {
  const races = await getAllRaces();
  return races.find((race) => race.id === id);
}
