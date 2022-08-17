import React from 'react';
import '../style.css';
import CloseBtn from './CloseBtn';

export default function Card () {
    return (
        <div className='sprint-card-item'>
            <CloseBtn />
        </div>
    )
}