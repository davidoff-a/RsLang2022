import "../style.css";
interface Props {
  handleGameStatus: React.MouseEventHandler<HTMLDivElement>;
}

export default function CloseBtn(props: Props) {
  return (
    <div className="sprint-close-btn" onClick={props.handleGameStatus}>
      <CloseIcon />
    </div>
  );
}
