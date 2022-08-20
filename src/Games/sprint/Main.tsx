import React from 'react';
import Card from './GameComponents/Card';
import './style.css';


export interface ISprintWords {
    id: number;
    word: string;
    wordTranslate: string;
}

const testWords: ISprintWords[]  = [
    {   
        id: 1,
        word: "apple",
        wordTranslate: "яблоко"}, 
    {
        id: 2,
        word: "banana",
        wordTranslate: "банан"}, 
    {
        id: 3,
        word:"tree",
        wordTranslate: "дерево"
    }
]

const randomAnswers: string[] = [];

function getRandomAnswers (wordsArr: ISprintWords[]) {
    wordsArr.map(word => randomAnswers.push(word.wordTranslate));
    randomAnswers.sort(() => Math.random() - 0.5);
}
getRandomAnswers(testWords);



export default function Main() {
    return (
        <div className='sprint-wrapper'>
            <Card wordsArr={testWords} randomAnswers={randomAnswers}/>
        </div>
    )
}