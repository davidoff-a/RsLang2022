import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { GameButton } from "../components/GameButton";
import StorageWrapper from "../components/storageWrapper";
import { IUserWord } from "../common/interfaces/userWord";
import { TextbookTabs } from "./textbook/TextbookTabs";
import { wordsAdapter, getWordsForTextbook } from "../service/APIHelper";
import { IWord } from "../common/interfaces/word";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { Difficulty } from "../common/enums/difficulty";
import { query as QueryService } from "../service/API";
import { lime, orange, green, cyan, blue, purple } from "@mui/material/colors";
import Main from "../Games/sprint/Main";
import { sprintResults } from "../Games/sprint/GameComponents/SprintSettings";

interface LocationParams {
  pathname: string;
  state: {
    group: number;
    page: number;
    items: IUserWord[];
    game: string;
    handle: (id: string, resultWord: string) => void;
  };
  search: string;
  hash: string;
  key: string;
}

const groupsColor: string[] = [
  lime[400],
  orange[400],
  green[400],
  cyan[400],
  blue[400],
  purple[400],
];

export function GamesPage() {
  const { state } = useLocation() as LocationParams;
  const storage = StorageWrapper.getInstance();
  const userId: string | null = storage.getSavedUser() as string;

  console.log(state);

  const [pageState, setPageState] = useState({
    isLogged: userId ? true : false,
    group: state ? state.group : -1,
    page: state ? state.page : -1,
    error: "",
    isLoaded: true,
    items: state ? state.items : ([] as IUserWord[]),
    gameView: <div className="sprint-main-wrapper"></div>,
    game: state ? state.game : "",
  });

  const onError = (error: string): void => {
    setPageState({
      ...pageState,
      isLoaded: true,
      items: [] as IUserWord[],
      error: error,
    });
  };

  const getItems = (group = 0, page = 0, isLogged = false): void => {
    let queryResult: Promise<
      IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]]
    >;
    if (!isLogged) {
      queryResult = QueryService.getWordsPage(group, page);
    } else {
      queryResult = getWordsForTextbook(userId, group, page);
    }
    queryResult.then(
      (result) => {
        if (result.length > 0) {
          const items = wordsAdapter(result);
          if (items.length > 0) {
            setPageState({
              ...pageState,
              isLogged,
              group,
              page,
              isLoaded: true,
              items,
            });
          }
        } else {
          onError("There are not data from server!");
        }
      },
      (error) => {
        onError(error as string);
      }
    );
  };

  const notStudiedWords = () => {
    if (pageState.isLogged && state) {
      const notStudiedWords: IUserWord[] = [];
      for (let i = 0; i < pageState.items.length; i++) {
        if (pageState.items[i].difficulty !== Difficulty.STUDIED) {
          notStudiedWords.push({ ...pageState.items[i] });
        }
      }
      return notStudiedWords;
    }
    return pageState.items;
  };

  const handleWordScore = (id: string, resultWord: string) => {
    pageState.items.forEach((item) => {
      if (item.id === id) {
        if (resultWord === "true") {
          item.goals += 1;
        } else {
          if (item.goals !== 0) {
            item.goals -= 1;
          }
        }
      }
    });
  };

  const onClickTab = (group: number) => {
    return getItems(group, 0, pageState.isLogged);
  };

  const onClickLinkGame = (game: string) => {
    setPageState({
      ...pageState,
      game,
      gameView: (
        <Main
          wordsArrMain={pageState.items}
          isLoaded={pageState.isLoaded}
          handleWordScore={handleWordScore}
        />
      ),
    });
  };

  const gamesCondition = () => {
    if (pageState.group < 0 && pageState.page < 0) {
      return (
        <div className="sprint-main-wrapper">
          <h3 className="sprint-title">Select difficulty level</h3>
          <TextbookTabs
            initialGroup={pageState.group}
            groupsColor={groupsColor}
            onClickTab={onClickTab}
          />
        </div>
      );
    } else {
      return (
        <div className="sprint-main-wrapper">
          <GameButton onClickLinkGame={onClickLinkGame} />
        </div>
      );
    }
  };

  if (state) {
    sprintResults.wins = 0;
    return (
      <Typography variant="h3" gutterBottom>
        <Main
          wordsArrMain={notStudiedWords()}
          isLoaded={pageState.isLoaded}
          handleWordScore={handleWordScore}
        />
        <Outlet />
      </Typography>
    );
  } else {
    sprintResults.wins = 0;
    return (
      <Typography variant="h3" gutterBottom>
        {gamesCondition()}
        {pageState.gameView}
        <Outlet />
      </Typography>
    );
  }
}
