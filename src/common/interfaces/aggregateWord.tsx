import { Difficulty } from "../enums/difficulty";
import { IWord } from "./word";

export interface IAggregateWord extends IWord {
  userWord?: {
    difficulty: Difficulty;
    optional: {
      goals: number;
      isUserWord: boolean;
    };
  };
}