import { Difficulty } from "../enums/difficulty";

export interface IAggregateWord {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord: {
    difficulty: Difficulty;
    optional: {
      goals: number;
      isUserWord: boolean
    };
  };
}
