import { useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { GameButton } from "./textBook/textBookComponents/GameButton";
import StorageWrapper from "../components/storageWrapper";
import { IUserWord } from "../common/interfaces/userWord";
import { TextbookTabs } from "./textBook/textBookComponents/TextbookTabs";
import { wordsAdapter, getWordsForTextbook } from "../service/APIHelper";
import { IWord } from "../common/interfaces/word";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { Difficulty } from "../common/enums/difficulty";
import { query as QueryService } from "../service/API";
import {
  lime,
  orange,
  green,
  cyan,
  blue,
  purple,
  pink,
  red,
  yellow,
} from "@mui/material/colors";
import Main from "../Games/sprint/Main";
import { sprintResults } from "../Games/sprint/GameComponents/SprintSettings";

interface Props {
  sprintSetting: boolean;
}

interface LocationParams {
  pathname: string;
  state: {
    items: IUserWord[];
    handle: (id: string, resultWord: string) => void;
  };
  search: string;
  hash: string;
  key: string;
}

export function GamesPage(props: Props) {
  const { state } = useLocation() as LocationParams;

  const storage = StorageWrapper.getInstance();

  const userId: string | null = storage.getSavedUser() as string;
  const initialGroup: string | null = storage.getSavedGroup() as string;
  const initialPage: string | null = storage.getSavedPage() as string;

  const [pageState, setPageState] = useState({
    isLogged: userId ? true : false,
    group: initialGroup ? +initialGroup : 0,
    page: initialPage ? +initialPage : 0,
    error: "",
    isLoaded: false,
    items: [] as IUserWord[],
    currentId: "",
    isPageStudied: false,
  });

  const [sprintSetting, setSprintSetting] = useState(props.sprintSetting);
  const handleSprintSetting = () => {
    setSprintSetting(true);
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

  const onError = (error: string): void => {
    setPageState({
      ...pageState,
      isLoaded: true,
      items: [] as IUserWord[],
      error: error,
    });
  };

  const onClickTab = (group: number) => {
    storage.setSavedGroup(`${group}`);
    handleSprintSetting();
    return getItems(group, pageState.page, pageState.isLogged);
  };

  const getItems = (
    group = 0,
    page = 0,
    isLogged = false,
    wordId?: string
  ): void => {
    let queryResult: Promise<
      IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]]
    >;
    if (!isLogged) {
      queryResult = QueryService.getWordsPage(group, page);
    } else {
      if (group < 6) {
        queryResult = getWordsForTextbook(userId, group, page);
      } else {
        queryResult = QueryService.getAggregatedWordsByFilter(
          userId,
          group,
          page,
          group === 6
            ? [Difficulty.HARD, Difficulty.HARD, Difficulty.HARD]
            : [Difficulty.STUDIED, Difficulty.STUDIED, Difficulty.STUDIED]
        );
      }
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
              currentId: wordId ? wordId : items[0].id,
              isPageStudied:
                items.every((item) => item.difficulty !== Difficulty.EASY) &&
                group < 6,
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

  const groupsColor: string[] = [
    lime[400],
    orange[400],
    green[400],
    cyan[400],
    blue[400],
    purple[400],
    pink[400],
    yellow[400],
  ];

  const [gameView, setGameView] = useState(
    <div className="sprint-main-wrapper"></div>
  );

  const handleGameView = (gameViewStatus: string) => {
    if (gameViewStatus == "viewSprint") {
      setGameView(
        <Main
          wordsArrMain={pageState.items}
          handleWordScore={handleWordScore}
        />
      );
    }
  };

  const onClickLinkGame = (link: string) => {
    if (link == "sprint") {
      handleGameView("viewSprint");
    }
  };

  let gamesCondition;

  if (!sprintSetting) {
    gamesCondition = (
      <div className="sprint-main-wrapper">
        <h3 className="sprint-title">Select difficulty level</h3>
        <TextbookTabs
          initialGroup={pageState.group}
          groupsColor={groupsColor.filter((color, id) =>
            pageState.isLogged ? true : id < 6
          )}
          onClickTab={onClickTab}
        />
      </div>
    );
  } else {
    gamesCondition = (
      <div className="sprint-main-wrapper">
        <GameButton onClickLinkGame={onClickLinkGame} />
      </div>
    );
  }

  if (state) {
    pageState.items = state.items;
    sprintResults.wins = 0;
    return (
      <Typography variant="h3" gutterBottom>
        <Main
          wordsArrMain={pageState.items}
          handleWordScore={handleWordScore}
        />
        <Outlet />
      </Typography>
    );
  } else {
    sprintResults.wins = 0;
    return (
      <Typography variant="h3" gutterBottom>
        {gamesCondition}
        {gameView}
        <Outlet />
      </Typography>
    );
  }
}
