interface ISprintWords {
  id: number;
  word: string;
  wordTranslate: string;
}

interface ISprintResults {
  wordsArr: ISprintWords[];
  randomAnswers: string[];
  currentWordNumber: number;
  wins: number;
}

export const sprintResults: ISprintResults = {
  wordsArr: [],
  randomAnswers: [],
  currentWordNumber: 0,
  wins: 0,
};
