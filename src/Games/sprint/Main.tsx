import React from 'react';
import Card from './GameComponents/Card';
import './style.css';

interface ISprintWords {
    id: number;
    word: string;
}

const testWords: ISprintWords[]  = [{id:1,word:"apple"}, {id:2,word:"banana"}, {id:3,word:"tree"}]

export default function Main() {
    return (
        <div className='sprint-wrapper'>
            <Card words={testWords}/>
        </div>
    )
}