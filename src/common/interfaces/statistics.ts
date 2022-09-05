import { Games } from "../enums/games";

export interface IStatistics {
  game: Games | string;
  dateTime: string;
  totalWords: string;
  learnedWords: string;
  newWords: string;
  trueWords: string;
  longSeries: string;
}
