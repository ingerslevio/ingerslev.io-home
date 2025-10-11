export enum Category {
  Road = "road",
  Trail = "trail",
  Track = "track",
  Ultra = "ultra",
  Marathon = "marathon",
  HalfMarathon = "half-marathon",
  Distance10k = "10k",
  Distance5k = "5k",
}

export enum Status {
  Upcoming = "upcoming",
  Completed = "completed",
}

export interface Race {
  id: string;
  name: {
    en: string;
    da: string;
  };
  date: Date;
  location: {
    en: string;
    da: string;
  };
  description: {
    en: string;
    da: string;
  };
  category:
    | Category.Road
    | Category.Trail
    | Category.Track
    | Category.Ultra
    | Category.Marathon
    | Category.HalfMarathon
    | Category.Distance10k
    | Category.Distance5k;
  distance?: number; // in kilometers
  timeInHours?: number;
  status: Status;
  results?: {
    time?: string;
    position?: number;
    totalParticipants?: number;
    pace?: string;
  };
  media?: {
    videos?: string[];
    photos?: string[];
  };
  projectUrl?: string; // Only for past races
  stravaUrl?: string; // Only for past races
}

export type Language = "en" | "da";
