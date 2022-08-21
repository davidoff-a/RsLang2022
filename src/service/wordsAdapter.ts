import { Difficulty } from "../common/enums/difficulty";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { IAggregateWord } from "../common/interfaces/aggregateWord";
import { IUserWord } from "../common/interfaces/userWord";
import { IWord } from "../common/interfaces/word";
import { query as QueryService } from "./API";

function instanceofIAggregateResult(
  object: IAggregateResult[] | [IWord[], IAggregateResult[]]
): object is IAggregateResult[] {
  return Array.isArray(object) && object.length > 0 && 'paginatedResults' in object[0];
}

export function wordsAdapter(
  inputData:  IAggregateResult[] | [IWord[], IAggregateResult[]]
): IUserWord[] {
  const data: IUserWord[] = [];
  if (instanceofIAggregateResult(inputData)) {
    const aggregateData: IAggregateWord[] = inputData[0].paginatedResults;
    aggregateData.forEach((item) => {
      data.push({
        ...item,
        id: item._id,
        goals: item.userWord.optional.goals,
        difficulty: item.userWord.difficulty,
        studied: item.userWord.optional.studied,
      });
    });
  } else {
    const words: IWord[]= inputData[0];
    const aggregateWords: IAggregateWord[]= inputData[1][0].paginatedResults;
    words.forEach((item) => {
      const aggregateWord = aggregateWords.find( elem => elem._id === item.id);
      data.push({
        ...item,
        difficulty: aggregateWord ? aggregateWord.userWord.difficulty : Difficulty.EASY,
        goals: aggregateWord ? aggregateWord.userWord.optional.goals : 0,
        studied: aggregateWord ? aggregateWord.userWord.optional.studied : false,
      });
    });

    
  }
  return data;
}

export async function getWordsForTextbook(
  userId: string,
  group: number,
  page: number,
):  Promise<[IWord[], IAggregateResult[]]> {
  return await Promise.all([
    QueryService.getWordsPage(group, page),
    QueryService.getAggregatedWordsByFilter(
      userId,
      `{userWord.difficulty:${Difficulty.HARD}}`
    )
  ]);
}

