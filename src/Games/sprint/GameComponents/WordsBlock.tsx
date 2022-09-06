interface ISprintWords {
  id: number;
  word: string;
}

export default function WordsBlock(words: [ISprintWords], id = 0) {
  return `<div data-id="${words[id].id}">${words[id].word}</div>`;
}

// function generateId (wordsArr: []) {
//     return wordsArr[Math.floor(Math.random() * wordsArr.length)];
// }

// async function addWord(wordsArr: []) {
//     const id: number = generateId(wordsArr);
// }
