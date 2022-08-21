import { Difficulty } from "../common/enums/difficulty";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { IAggregateWord } from "../common/interfaces/aggregateWord";
import { IUserWord } from "../common/interfaces/userWord";
import { IWord } from "../common/interfaces/word";
import { query as QueryService } from "./API";

function instanceofIAggregateResult(
  object: IAggregateResult[] | [IWord[], IAggregateResult[]]
): object is IAggregateResult[] {
  return (
    Array.isArray(object) &&
    object.length > 0 &&
    "paginatedResults" in object[0]
  );
}

export function wordsAdapter(
  inputData: IAggregateResult[] | [IWord[], IAggregateResult[]]
): IUserWord[] {
  const data: IUserWord[] = [];
  if (instanceofIAggregateResult(inputData)) {
    const aggregateData: IAggregateWord[] = inputData[0].paginatedResults;
    aggregateData.forEach((item) => {
      data.push({
        ...item,
        id: item._id,
        difficulty: item.userWord ? item.userWord.difficulty : Difficulty.EASY,
        goals: item.userWord ? item.userWord.optional.goals : 0,
        isUserWord: item.userWord ? true : false,
      });
    });
  } else {
    const words: IWord[] = inputData[0];
    const aggregateWords: IAggregateWord[] = inputData[1][0].paginatedResults;
    words.forEach((item) => {
      const aggregateWord = aggregateWords.find((elem) => elem._id === item.id);
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
  page: number
): Promise<[IWord[], IAggregateResult[]]> {
  return await Promise.all([
    QueryService.getWordsPage(group, page),
    QueryService.getAggregatedWordsByFilter(userId, [Difficulty.HARD, Difficulty.STUDIED, Difficulty.EASY]),
  ]);
}
