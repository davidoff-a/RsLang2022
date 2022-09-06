import { Games } from "../enums/games";

export interface IStatisticsResult {
  id?: string;
  learnedWords: string;
  optional: {
    data: {
      statistics: [
        {
          game: Games;
          dateTime: string;
          totalWords: string;
          learnedWords: string;
          newWords: string;
          trueWords: string;
          longSeries: string;
        }
      ];
    };
  };
}
