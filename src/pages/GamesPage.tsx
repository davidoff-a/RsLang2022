import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { lime, orange, green, cyan, blue, purple } from '@mui/material/colors';

import { GameButton } from '../components/GameButton';
import StorageWrapper from '../components/storageWrapper';
import { IUserWord } from '../common/interfaces/userWord';
import { TextbookTabs } from './textBook/TextbookTabs';
import { wordsAdapter, getWordsForTextbook } from '../service/APIHelper';
import { IWord } from '../common/interfaces/word';
import { IAggregateResult } from '../common/interfaces/aggregateResult';
import { Difficulty } from '../common/enums/difficulty';
import { query as QueryService } from '../service/API';
import Main from '../Games/sprint/Main';
import { sprintResults } from '../Games/sprint/GameComponents/SprintSettings';
import { IStatistics } from '../common/interfaces/statistics';
import { Games } from '../common/enums/games';
import { IStatisticsResult } from '../common/interfaces/statisticsResult';

interface LocationParams {
  pathname: string;
  state: {
    group: number;
    page: number;
    isLogged: boolean;
    items: IUserWord[];
    game: Games;
    handle: (id: string, resultWord: string) => void;
  };
  search: string;
  hash: string;
  key: string;
}

const groupsColor: string[] = [lime[400], orange[400], green[400], cyan[400], blue[400], purple[400]];

export const checkAuthorization = async (id: string) => {
  return await QueryService.getUser(id);
};

export function GamesPage() {
  const { state } = useLocation() as LocationParams;
  const storage = StorageWrapper.getInstance();
  const userId: string | null = storage.getSavedUser() as string;
  const statistics: IStatistics = {
    game: state ? state.game : Games.SPRINT,
    dateTime: `${new Date().getTime()}`,
    totalWords: '',
    learnedWords: '',
    newWords: '',
    trueWords: '',
    longSeries: '',
  };

  const [pageState, setPageState] = useState({
    isLogged: state ? state.isLogged : !!userId,
    group: state ? state.group : -1,
    page: state ? state.page : -1,
    error: '',
    isLoaded: false,
    items: state ? state.items : ([] as IUserWord[]),
    gameView: <div className="sprint-main-wrapper"></div>,
    game: state ? state.game : '',
    limit: 20,
  });

  const onError = (error: string): void => {
    setPageState({
      ...pageState,
      isLoaded: true,
      items: [] as IUserWord[],
      error: error,
    });
  };

  const getItems = (
    group = 0,
    page = 0,
    isLogged = false,
    notStudiedWords: IUserWord[] | undefined = undefined,
  ): void => {
    if (notStudiedWords && notStudiedWords.length === pageState.limit) {
      return;
    }
    let queryResult: Promise<IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]]>;
    if (!isLogged) {
      queryResult = QueryService.getWordsPage(group, page);
    } else {
      queryResult = getWordsForTextbook(userId, group, page);
    }
    queryResult.then(
      result => {
        if (result.length > 0) {
          const items = wordsAdapter(result);
          if (items.length > 0) {
            while (notStudiedWords && notStudiedWords.length < pageState.limit) {
              items.forEach(elem => {
                if (elem.difficulty !== Difficulty.STUDIED && notStudiedWords.length < pageState.limit) {
                  notStudiedWords.push({ ...elem });
                }
              });
              if (notStudiedWords.length < pageState.limit && page > 0) {
                const queryPage = page - 1;
                getItems(pageState.group, queryPage, pageState.isLogged, notStudiedWords);
              }
            }
            if (notStudiedWords) {
              if (notStudiedWords.length === pageState.limit || page === 0) {
                setPageState({
                  ...pageState,
                  isLogged,
                  group,
                  page,
                  isLoaded: true,
                  items: notStudiedWords,
                });
              }
            } else {
              setPageState({
                ...pageState,
                isLogged,
                group,
                page,
                isLoaded: true,
                items,
              });
            }
          }
        } else {
          onError('There are not data from server!');
        }
      },
      error => {
        onError(error as string);
      },
    );
  };

  const addWordsToLimit = () => {
    if (pageState.isLogged && state && !pageState.isLoaded) {
      const notStudiedWords: IUserWord[] = [];
      for (let i = 0; i < pageState.items.length; i++) {
        if (pageState.items[i].difficulty !== Difficulty.STUDIED) {
          notStudiedWords.push({ ...pageState.items[i] });
        }
      }
      if (pageState.items.length < pageState.limit && pageState.page > 0) {
        const queryPage = pageState.page - 1;
        getItems(pageState.group, queryPage, pageState.isLogged, notStudiedWords);
      } else {
        setPageState({
          ...pageState,
          isLoaded: true,
        });
      }
    } else if (!pageState.isLogged && state && !pageState.isLoaded) {
      setPageState({
        ...pageState,
        isLoaded: true,
      });
    }
  };

  const handleWordScore = (id: string, resultWord: string) => {
    pageState.items.forEach(item => {
      if (item.id === id) {
        if (resultWord === 'true') {
          item.goals += 1;
          statistics.longSeries = `${+statistics.longSeries + 1}`;
          statistics.trueWords = `${+statistics.trueWords + 1}`;
        } else {
          if (item.goals !== 0) {
            item.goals -= 1;
            statistics.longSeries = `0`;
          }
        }
        if (!item.isUserWord) {
          statistics.newWords = `${+statistics.newWords + 1}`;
        }
        statistics.totalWords = `${+statistics.totalWords + 1}`;
      }
    });
  };

  const saveUserWord = (isUserWord: boolean, wordId: string, difficulty: Difficulty, goals: number) => {
    let resp: Promise<Response>;
    if (isUserWord) {
      resp = QueryService.updateUserWords(userId, wordId, {
        difficulty,
        optional: { goals },
      });
    } else {
      resp = QueryService.addUserWords(userId, wordId, {
        difficulty,
        optional: { goals },
      });
    }
    resp.catch(error => {
      onError(error as string);
    });
  };

  const saveStatistics = (): void => {
    const queryResult: Promise<IStatisticsResult> = QueryService.getUserStats(userId);
    queryResult.then(
      result => {
        if (result) {
          result.optional.data.statistics.push(statistics);
          const body: IStatisticsResult = {
            learnedWords: '0',
            optional: {
              data: {
                statistics: result.optional.data.statistics,
              },
            },
          };
          const resp: Promise<Response> = QueryService.updateUserStats(userId, body);
          resp.catch(error => {
            onError(error as string);
          });
        } else {
          onError('There are not data from server!');
        }
      },
      error => {
        onError(error as string);
      },
    );
  };

  const gameIsOver = () => {
    pageState.items.forEach(item => {
      const saveItem = { ...item };
      if (saveItem.difficulty === Difficulty.HARD && saveItem.goals === 5) {
        statistics.learnedWords = `${+statistics.learnedWords + 1}`;
        saveItem.difficulty = Difficulty.STUDIED;
        saveItem.goals = 0;
      }
      if (saveItem.difficulty === Difficulty.EASY && saveItem.goals === 3) {
        statistics.learnedWords = `${+statistics.learnedWords + 1}`;
        saveItem.difficulty = Difficulty.STUDIED;
        saveItem.goals = 0;
      }
      if (pageState.isLogged) {
        const { isUserWord, id, difficulty, goals } = saveItem;
        saveUserWord(isUserWord, id, difficulty, goals);
      }
    });
    if (pageState.isLogged) {
      if (pageState.game === Games.SPRINT) {
        statistics.game = Games.SPRINT;
      } else if (pageState.game === Games.AUDIOCALL) {
        statistics.game = Games.AUDIOCALL;
      }
      saveStatistics();
    }
  };

  const getRandomPage = () => {
    const page = Math.floor(Math.random() * 30);
    return page === 30 ? 29 : page;
  };

  const onClickTab = (group: number) => {
    checkAuthorization(userId)
      .then(resultCheck => {
        if (!resultCheck.ok) {
          getItems(group, getRandomPage(), false);
        } else {
          getItems(group, getRandomPage(), true);
        }
      })
      .catch(error => {
        onError(error as string);
      });
  };

  const onClickLinkGame = (game: Games) => {
    setPageState({
      ...pageState,
      game,
    });
  };

  const onClickRepeatButton = () => {
    setPageState({
      ...pageState,
      group: state ? state.group : -1,
      page: state ? state.page : -1,
      error: '',
      isLoaded: false,
      items: state ? state.items : ([] as IUserWord[]),
      game: state ? state.game : '',
    });
  };

  const gamesCondition = () => {
    if (pageState.group < 0 && pageState.page < 0) {
      return (
        <div className="sprint-main-wrapper">
          <h3 className="sprint-title">Select difficulty level</h3>
          <TextbookTabs initialGroup={0} groupsColor={groupsColor} onClickTab={onClickTab} />
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

  if (pageState.game) {
    sprintResults.wins = 0;
    addWordsToLimit();
    return (
      <Typography variant="h3" gutterBottom>
        <Main
          wordsArrMain={pageState.items}
          isLoaded={pageState.isLoaded}
          handleWordScore={handleWordScore}
          gameIsOver={gameIsOver}
          onClickRepeatButton={onClickRepeatButton}
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