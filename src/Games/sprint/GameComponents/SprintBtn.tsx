import React from "react";

interface IButton {
  action: string;
  handleWordIndx: React.MouseEventHandler<HTMLButtonElement>;
  translate: string;
  randomWord: string;
  id: string;
}

export default function SprintBtn(props: IButton) {
  return (
    <button
      className="sprint-btn"
      data-id={props.id}
      data-translate={props.translate}
      data-random={props.randomWord}
      onClick={props.handleWordIndx}
    >
      {props.action}
    </button>
  );
}
