import { Difficulty } from '../common/enums/difficulty';
import { IAggregateResult } from '../common/interfaces/aggregateResult';
import { IAggregateWord } from '../common/interfaces/aggregateWord';
import { IStatisticsResult } from '../common/interfaces/statisticsResult';
import { IUserStatistics } from '../common/interfaces/userStatistics';
import { IUserWord } from '../common/interfaces/userWord';
import { IWord } from '../common/interfaces/word';
import { query as QueryService } from './API';

function instanceofIAggregateResult(
  object: IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]],
): object is IAggregateResult[] {
  return (
    Array.isArray(object) &&
    object.length > 0 &&
    'paginatedResults' in object[0]
  );
}

function instanceofIWord(
  object: IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]],
): object is IWord[] {
  return Array.isArray(object) && object.length > 0 && 'id' in object[0];
}

export function wordsAdapter(
  inputData: IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]],
): IUserWord[] {
  const data: IUserWord[] = [];
  if (instanceofIAggregateResult(inputData)) {
    const aggregateData: IAggregateWord[] = inputData[0].paginatedResults;
    aggregateData.forEach(item => {
      data.push({
        ...item,
        id: item.id,
        difficulty: item.userWord ? item.userWord.difficulty : Difficulty.EASY,
        goals: item.userWord ? item.userWord.optional.goals : 0,
        isUserWord: item.userWord ? true : false,
      });
    });
  } else if (instanceofIWord(inputData)) {
    inputData.forEach(item => {
      data.push({
        ...item,
        difficulty: Difficulty.EASY,
        goals: 0,
        isUserWord: false,
      });
    });
  } else {
    const words: IWord[] = inputData[0];
    const aggregateWords: IAggregateWord[] = inputData[1][0].paginatedResults;
    words.forEach(item => {
      const aggregateWord = aggregateWords.find(elem => elem.id === item.id);
      data.push({
        ...item,
        difficulty:
          aggregateWord && aggregateWord.userWord
            ? aggregateWord.userWord.difficulty
            : Difficulty.EASY,
        goals:
          aggregateWord && aggregateWord.userWord
            ? aggregateWord.userWord.optional.goals
            : 0,
        isUserWord: aggregateWord && aggregateWord.userWord ? true : false,
      });
    });
  }
  return data;
}

export async function getWordsForTextbook(
  userId: string,
  group: number,
  page: number,
): Promise<IAggregateResult[]> {
  return QueryService.getAggregatedWordsByFilter(userId, group, page, [
    Difficulty.HARD,
    Difficulty.STUDIED,
    Difficulty.EASY,
  ]);
}

export function statisticsAdapter(
  inputData: IStatisticsResult,
): IUserStatistics[] {
  const arr = inputData.optional.data.statistics;
  return arr.map(item => {
    const date = new Date(+item.dateTime);
    return {
      game: item.game,
      totalWords: Number(item.totalWords),
      learnedWords: Number(item.learnedWords),
      newWords: Number(item.newWords),
      trueWords: Number(item.trueWords),
      longSeries: Number(item.longSeries),
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  });
}
