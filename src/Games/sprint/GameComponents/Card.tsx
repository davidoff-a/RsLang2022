import React from 'react';
import '../style.css';
import SprintBtn from './SprintBtn';
import CloseBtn from './CloseBtn';
import {sprintResults} from './SprintSettings';
// import ISprintWords from '../Main';

// interface ICard {
//     wordsArr: ISprintWords[];
//     randomAnswers: string[];
//     currentWordNumber: number;
// }

// export interface ISprintWords {
//     id: number;
//     word: string;
//     wordTranslate: string;
// }

// interface Props {
//     wordsArr: ICard;
//     key: number;
// }

export default function Card () {

    const el = sprintResults.wordsArr[sprintResults.currentWordNumber];
    const randomAnswer = sprintResults.randomAnswers[sprintResults.currentWordNumber];
    const wordsArrLength = sprintResults.wordsArr.length;
    if (wordsArrLength < sprintResults.currentWordNumber) {
        return (
            <div>The End</div>
        )
    } else {
        return (
            <div className='sprint-card-item'>
                <CloseBtn />
                <div className="sprint-word" data-id={el.id}>{el.word}</div>
                <div className="sprint-translate"> {sprintResults.randomAnswers[0]}</div>
                <div className='sprint-btn-block'>
                    <SprintBtn action={'yes'} word={el.word} wordTranslate={el.wordTranslate} randomAnswer={randomAnswer}/>
                    <SprintBtn action={'no'} word={el.word} wordTranslate={el.wordTranslate} randomAnswer={randomAnswer}/>
                </div>
                <div className="sprint-progress-line">
                    
                </div>
            </div>
        )
    }
    
}