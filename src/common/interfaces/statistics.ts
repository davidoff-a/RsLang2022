import { Games } from "../enums/games";

export interface IStatistics {
  game: Games;
  dateTime: string;
  totalWords: string;
  learnedWords: string;
  newWords: string;
  trueWords: string;
  longSeries: string;
}
