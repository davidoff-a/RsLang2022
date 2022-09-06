import { Games } from "../enums/games";

export interface IStatisticsResult {
  id?: string;
  learnedWords: string;
  optional: {
    data: {
      statistics: [IStatistics];
    };
  };
}
