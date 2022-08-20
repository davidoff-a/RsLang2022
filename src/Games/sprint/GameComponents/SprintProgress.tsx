import React from 'react';
import {ISprintWords} from './Card';

interface ISprintProgress {
    wordsArr: ISprintWords[];

}

export default function SprintProgress ({wordsArr}: ISprintProgress) {
    const progressLength = wordsArr.length;
    return (
        <div className='progress-line-block'>
            {wordsArr.map(word => {
                return (<div className='progress-line-item'>

                </div>)
            })}
        </div>
    )
}