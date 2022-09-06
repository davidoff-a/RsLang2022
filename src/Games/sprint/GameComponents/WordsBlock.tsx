import React from 'react';

interface ISprintWords {
  id: number;
  word: string;
}

export default function WordsBlock(words: [ISprintWords], id: number = 0) {
  return `<div data-id="${words[id].id}">${words[id].word}</div>`;
}
