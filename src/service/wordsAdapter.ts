import { Difficulty } from "../common/enums/difficulty";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { IAggregateWord } from "../common/interfaces/aggregateWord";
import { IUserWord } from "../common/interfaces/userWord";
import { IWord } from "../common/interfaces/word";

function instanceofIWord(
  object: IWord[] | IAggregateResult[]
): object is IWord[] {
  return Array.isArray(object) && object.length > 0 && 'id' in object[0];
}

export function wordsAdapter(
  inputData: IWord[] | IAggregateResult[]
): IUserWord[] {
  const data: IUserWord[] = [];
  if (instanceofIWord(inputData)) {
    inputData.forEach((item) => {
      data.push({
        ...item,
        difficulty: Difficulty.EASY,
        goals: 0,
        studied: false,
      });
    });
  } else {
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
  }
  return data;
}
