import { IStatistics } from './statistics';

export interface IStatisticsResult {
  id?: string;
  learnedWords: string;
  optional: {
    data: {
      statistics: [IStatistics];
    };
  };
}
