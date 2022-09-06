import "../style.css";
import { IUserWord } from "../../../common/interfaces/userWord";

interface Props {
  cardData: IUserWord;
  randomWord: string;
}

export default function Card(props: Props) {
  return (
    <div className="sprint-card-item">
      <div className="sprint-word" data-id={props.cardData.id}>
        {props.cardData.word}
      </div>
      <div className="sprint-translate"> {props.randomWord}</div>
      <div className="sprint-progress-line"></div>
    </div>
  );
}
