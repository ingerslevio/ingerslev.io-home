import type { Race } from "../../types/race";

export const raceData: Race = {
  id: "2025-02-10-100km-world-championships",
  name: {
    en: "100km World Championships",
    da: "100km World Championships",
  },
  date: new Date("2025-02-10"),
  location: {
    en: "Skødstrup",
    da: "Skødstrup",
  },
  description: {
    en: "Training session: 100km world championships.",
    da: "Træningssession: 100km world championships.",
  },
  category: "marathon",
  distance: 101.459,
  status: "completed",
  results: {
    time: "N/A",
    position: 1,
    totalParticipants: 1,
    pace: "N/A",
  },
  stravaUrl: "https://www.strava.com/activities/13064146904",
};
