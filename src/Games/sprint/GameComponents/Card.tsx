import React from 'react';
import '../style.css';
import CloseBtn from './CloseBtn';

interface ICard {
    id: number;
}

interface ISprintWords {
    id: number;
    word: string;
}

export default function Card (words: ISprintWords[], id: number = 0) {
    return (
        <div className='sprint-card-item'>
            <CloseBtn />
            <div data-id={words[id].id}>{words[id].word}</div>
        </div>
    )
}