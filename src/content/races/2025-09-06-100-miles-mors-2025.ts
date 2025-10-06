import { Category, Status, type Race } from "../../types/race";

export const raceData: Race = {
  id: "2025-09-06-100-miles-mors-2025",
  name: {
    en: "100 miles around the Isle of Mors",
    da: "Mors 100 miles",
  },
  date: new Date("2025-09-06"),
  location: {
    en: "Isle of Mors",
    da: "Mors",
  },
  description: {
    en: "1st place 🥳🏃🏼‍♂️💨 and new danish record 🤩",
    da: "1. plads 🥳🏃🏼‍♂️💨 og ny dansk rekord 🤩",
  },
  category: Category.Ultra,
  distance: 160.9,
  status: Status.Completed,
  results: {
    time: "12:54:16",
    position: 1,
    totalParticipants: 172,
    pace: "4:48",
  },
  stravaUrl: "https://www.strava.com/activities/15721472352",
};
