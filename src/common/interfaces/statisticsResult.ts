import { Games } from "../enums/games";

export interface IStatisticsResult {
  id?: string;
  learnedWords: number;
  optional: {
    data: {
      statistics: [
        {
          game: Games;
          dateTime: number;
          totalWords: number;
          learnedWords: number;
          newWords: number;
          trueWords: number;
          longSeries: number;
        }
      ];
    };
  };
}
