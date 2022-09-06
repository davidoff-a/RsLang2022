import { Games } from "../enums/games";

export interface IUserStatistics {
  game: Games;
  totalWords: number;
  learnedWords: number;
  newWords: number;
  trueWords: number;
  longSeries: number;
  year: number;
  month: number;
  day: number;
}
