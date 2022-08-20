import React from 'react';
import '../style.css';
import SprintBtn from './SprintBtn';
import CloseBtn from './CloseBtn';
// import ISprintWords from '../Main';

interface ICard {
    wordsArr: ISprintWords[];
    randomAnswers: string[];
}

export interface ISprintWords {
    id: number;
    word: string;
}

// interface Props {
//     wordsArr: ICard;
//     key: number;
// }

export default function Card ({wordsArr, randomAnswers}: ICard) {
    const el = wordsArr[0];
    return (
        <div className='sprint-card-item'>
            <CloseBtn />
    <div data-id={el.id}>{el.word} - {randomAnswers[0]}</div>
            <div className='sprint-btn-block'>
                <SprintBtn action={'Yes'}/>
                <SprintBtn action={'No'}/>
            </div>
            <div className="sprint-progress-line">
                
            </div>
        </div>
    )
}