import React from 'react';

interface IButton {
    action: string;
}

export default function SprintBtn (props: IButton) {
    return (
    <button className="sprint-btn">{props.action}</button>
    )
}