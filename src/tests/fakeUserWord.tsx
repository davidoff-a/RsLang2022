import { Difficulty } from "../common/enums/difficulty";
import { IUserWord } from "../common/interfaces/userWord";

export const userWord: IUserWord = {
  id: "5e9f5ee35eb9e72bc21b00ac",
  group: 5,
  page: 4,
  word: "coarse",
  image: "files/05_3085.jpg",
  audio: "files/05_3085.mp3",
  audioMeaning: "files/05_3085_meaning.mp3",
  audioExample: "files/05_3085_example.mp3",
  textMeaning:
    "If something is <i>coarse</i>, that means it has a rough texture.",
  textExample: "The <b>coarse</b> sweater made my skin itch.",
  transcription: "[kɔːrs]",
  textExampleTranslate: "Грубый свитер заставил мою кожу чесаться",
  textMeaningTranslate:
    "Если что-то грубое, это означает, что оно имеет грубую текстуру",
  wordTranslate: "грубый",
  difficulty: Difficulty.EASY,
  goals: 0,
  isUserWord: true
};
