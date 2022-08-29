import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { IUserWord } from "../common/interfaces/userWord";

// interface LocationState {
//   items: IUserWord[];
// }

export interface LocationParams {
  pathname: string;
  state: { items: IUserWord[] };
  search: string;
  hash: string;
  key: string;
}

export function GamePage() {
  const params = useParams();
  const {state} = useLocation() as LocationParams;

  console.log(state.items);
  return <Typography>Game page {params.gameId}</Typography>;
}
