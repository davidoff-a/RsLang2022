import { useLocation, useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { IUserWord } from '../common/interfaces/userWord';
import Main from '../Games/sprint/Main';

export interface LocationParams {
  pathname: string;
  state: {
    items: IUserWord[];
    handle: (id: string, resultWord: string) => void;
  };
  search: string;
  hash: string;
  key: string;
}

export function GamePage() {
  const params = useParams();
  const { state } = useLocation() as LocationParams;
  console.log(state);
  return (
    <Typography>
      <Main wordsArrMain={state.items} handleWordScore={state.handle} />
    </Typography>
  );
}
