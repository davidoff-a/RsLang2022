import React from 'react';
import '../style.css';
import CloseIcon from '@mui/icons-material/Close';

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
