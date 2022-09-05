import React, { useState } from "react";
import { sprintResults } from "./GameComponents/SprintSettings";
import Card from "./GameComponents/Card";
import "./style.css";
import SprintBtn from "./GameComponents/SprintBtn";
import CloseBtn from "./GameComponents/CloseBtn";
import { IUserWord } from "../../common/interfaces/userWord";

interface Props {
  wordsArrMain: IUserWord[];
  handleWordScore: (id: string, resultWord: string) => void;
}

export default function Main(props: Props) {
  const [wordIndx, setWordIndx] = useState(1);
  const [cardData, setCardData] = useState(props.wordsArrMain[0]);
  const getRandomIndx = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  const [gameStatus, setGameStatus] = useState("block");

  let randomIndx = getRandomIndx(props.wordsArrMain.length);

  const handleWordIndx = (e: React.MouseEvent<HTMLButtonElement>) => {
    checkWord(e.currentTarget);
    setWordIndx(wordIndx + 1);
    setCardData(props.wordsArrMain[wordIndx]);
    randomIndx = getRandomIndx(props.wordsArrMain.length);
  };

  const handleGameStatus = () => {
    setGameStatus("none");
  };

  const checkWord = (btn: HTMLButtonElement) => {
    switch (btn.innerHTML) {
      case "yes":
        if (btn.dataset["translate"] === btn.dataset["random"]) {
          if (!btn.dataset["id"]) return;
          props.handleWordScore(btn.dataset["id"], "true");
          sprintResults.wins += 1;
        } else {
          if (!btn.dataset["id"]) return;
          props.handleWordScore(btn.dataset["id"], "false");
        }
        break;
      case "no":
        if (btn.dataset["translate"] !== btn.dataset["random"]) {
          if (!btn.dataset["id"]) return;
          props.handleWordScore(btn.dataset["id"], "true");
          sprintResults.wins += 1;
        } else {
          if (!btn.dataset["id"]) return;
          props.handleWordScore(btn.dataset["id"], "false");
        }
        break;
    }
  };

  const wordsArrLength = props.wordsArrMain.length;

  if (gameStatus == "none") {
    return (
      <div className="sprint-main-wrapper">
        <h3 className="sprint-title">
          Game finished. Your Score: {sprintResults.wins}{" "}
        </h3>
      </div>
    );
  } else {
    if (wordIndx > wordsArrLength) {
      return (
        <div className="sprint-wrapper">
          <div className="sprint-card-wrapper">
            <CloseBtn handleGameStatus={handleGameStatus} />
            The end
          </div>
        </div>
      );
    } else {
      return (
        <div className="sprint-wrapper">
          <div className="sprint-card-wrapper">
            <CloseBtn handleGameStatus={handleGameStatus} />
            <Card
              cardData={cardData}
              randomWord={props.wordsArrMain[randomIndx].wordTranslate}
            />
            <div className="sprint-btn-block">
              <SprintBtn
                action={"yes"}
                handleWordIndx={handleWordIndx}
                id={cardData.id}
                translate={cardData.wordTranslate}
                randomWord={props.wordsArrMain[randomIndx].wordTranslate}
              />
              <SprintBtn
                action={"no"}
                handleWordIndx={handleWordIndx}
                id={cardData.id}
                translate={cardData.wordTranslate}
                randomWord={props.wordsArrMain[randomIndx].wordTranslate}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
