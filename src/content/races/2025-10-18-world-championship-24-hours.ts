import { Category, Status, type Race } from "../../types/race";

export const raceData: Race = {
  id: "2025-10-18-world-championship-24-hours",
  name: {
    en: "World Championship 24 hours",
    da: "World Championship 24 hours",
  },
  date: new Date("2025-10-18"),
  location: {
    en: "Albi, France",
    da: "Albi, Frankrig",
  },
  description: {
    en: "World Championship 24 hours",
    da: "Verdensmesterskaberne i 24 timer",
  },
  category: Category.Ultra,
  time: 24,
  status: Status.Upcoming,
  // results: {
  //   totalParticipants: 380,
  // },
  stravaUrl: "https://www.strava.com/activities/15721472352",
};
