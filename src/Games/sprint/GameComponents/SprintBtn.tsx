import React from 'react';
// import { ISprintWords } from './Card';
import { MouseEventHandler } from 'react';
import Card from './Card';
import {sprintResults} from './SprintSettings'

interface IButton {
    action: string;
    word: string;
    wordTranslate: string;
    randomAnswer: string;
}

export default function SprintBtn (props: IButton) {
    return (
    <button className="sprint-btn" data-random={props.randomAnswer} data-word={props.word} data-translate={props.wordTranslate} onClick={checkWord}>{props.action}</button>
    )
}

const checkWord: MouseEventHandler = (event) => {
    const btn = event.currentTarget;
    if (!(btn instanceof HTMLButtonElement)) {
        return
    }
    switch (btn.innerHTML) {
        case 'yes':
            if (btn.dataset['translate'] === btn.dataset['random']) {
                console.log('true');
                sprintResults.currentWordNumber += 1;
                Card();
            } else {
                console.log('false');
                sprintResults.currentWordNumber += 1;
                Card();
            }
        break;
        case 'no': 
            if (btn.dataset['translate'] !== btn.dataset['random']) {
                console.log('true');
                sprintResults.currentWordNumber += 1;
                Card();
            } else {
                console.log('false');
                sprintResults.currentWordNumber += 1;
                Card();
            }
        break;
    }
}