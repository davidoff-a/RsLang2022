import React, { useState } from 'react';
import {sprintResults} from './GameComponents/SprintSettings'
import Card from './GameComponents/Card';
import './style.css';
import SprintBtn from './GameComponents/SprintBtn';
import CloseBtn from './GameComponents/CloseBtn';
import { IUserWord } from '../../common/interfaces/userWord';


// export interface ISprintWords {
//     audio: string;
//     audioExample: string;
//     audioMeaning: string;
//     difficulty: Difficulty;
//     goals: number;
//     group: number;
//     id: string;
//     image: string;
//     isUserWord: boolean;
//     page: number;
//     textExample: string;
//     textExampleTranslate: string;
//     textMeaning: string;
//     textMeaningTranslate: string;
//     word: string;
//     wordTranslate: string;
// }

// const testWords: ISprintWords[]  = [
//     {   
//         id: 1,
//         word: "apple",
//         wordTranslate: "яблоко"
//     }, 
//     {
//         id: 2,
//         word: "banana",
//         wordTranslate: "банан"
//     }, 
//     {
//         id: 3,
//         word:"tree",
//         wordTranslate: "дерево"
//     },
//     {
//         id: 4,
//         word:"book",
//         wordTranslate: "книга"
//     },
//     {
//         id: 5,
//         word:"box",
//         wordTranslate: "коробка"
//     }
// ]


function getRandomAnswers (wordsArr: IUserWord[]) {
    const randomAnswers: string[] = [];
    wordsArr.map(word => randomAnswers.push(word.wordTranslate));
    randomAnswers.sort(() => Math.random() - 0.5);
    return randomAnswers;
}

interface Props {
    wordsArrMain: IUserWord[];
}

// sprintResults.wordsArr = testWords;
// const randomAnswers = getRandomAnswers(testWords);

export default function Main(props: Props) {
    const randomAnswers = getRandomAnswers(props.wordsArrMain);
    const [wordIndx, setWordIndx] = useState(1);
    const [cardData, setCardData] = useState(props.wordsArrMain[0]);
    const [randomWord, setRandomWord] = useState(randomAnswers[0])
    const handleWordIndx = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        checkWord(e.currentTarget);
        setWordIndx(wordIndx+1);
        setCardData(props.wordsArrMain[wordIndx]);
        setRandomWord(randomAnswers[wordIndx]);
    };

    const checkWord = (btn: HTMLButtonElement) => {
        switch (btn.innerHTML) {
        case 'yes':
            if (btn.dataset['translate'] === btn.dataset['random']) {
                console.log('true');
                sprintResults.currentWordNumber += 1;
            } else {
                console.log('false');
                sprintResults.currentWordNumber += 1;
            }
        break;
        case 'no': 
            if (btn.dataset['translate'] !== btn.dataset['random']) {
                console.log('true');
                sprintResults.currentWordNumber += 1;
            } else {
                console.log('false');
                sprintResults.currentWordNumber += 1;
            }
        break;
    }
    }

    const wordsArrLength = props.wordsArrMain.length;
    if ( wordIndx > wordsArrLength) {
        return (
            <div className='sprint-wrapper'>
                <div className='sprint-card-wrapper'>
                <CloseBtn />
                   The end
                </div>
                
            </div>
        )
    } else {
        return (
            <div className='sprint-wrapper'>
                <div className='sprint-card-wrapper'>
                    <CloseBtn />
                    <Card cardData={cardData} randomWord={randomWord}/>
                    <div className='sprint-btn-block'>
                            <SprintBtn action={'yes'} handleWordIndx = {handleWordIndx} translate = {cardData.wordTranslate} randomWord={randomWord}/>
                            <SprintBtn action={'no'} handleWordIndx = {handleWordIndx} translate = {cardData.wordTranslate} randomWord={randomWord}/>
                    </div>  
                </div>
                
            </div>
        ) 
    }
  
}