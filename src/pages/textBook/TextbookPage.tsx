import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Container, Typography } from "@mui/material";
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

import { TextbookPagination } from "./TextbookPagination";
import { TextbookTabs } from "./TextbookTabs";
import { TextbookWords } from "./TextbookWords";
import { WordCard } from "./WordCard";
import { query as QueryService } from "../../service/API";
import { wordsAdapter, getWordsForTextbook } from "../../service/APIHelper";
import { IWord } from "../../common/interfaces/word";
import { IUserWord } from "../../common/interfaces/userWord";
import StorageWrapper from "../../components/storageWrapper";
import { Difficulty } from "../../common/enums/difficulty";
import { IAggregateResult } from "../../common/interfaces/aggregateResult";
import { GameButton } from "../../components/GameButton";
import { Games } from "../../common/enums/games";

const checkAuthorization = async (id: string) => {
  return await QueryService.getUser(id);
};

export function TextbookPage() {
  const storage = StorageWrapper.getInstance();
  const navigate = useNavigate();
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
        queryResult = QueryService.getAggregatedWordsByFilterOld(
          userId,
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
                items.every((item) => item.difficulty === Difficulty.STUDIED) &&
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

  useEffect(() => {
    checkAuthorization(userId)
      .then((resultCheck) => {
        if (!resultCheck.ok) {
          if (pageState.group > 5) {
            getItems(0, 0, false);
          } else {
            getItems(pageState.group, pageState.page, false);
          }
        } else {
          getItems(pageState.group, pageState.page, true);
        }
      })
      .catch((error) => {
        onError(error as string);
      });
  }, []);

  const onClickTab = (group: number) => {
    storage.setSavedGroup(`${group}`);

    return getItems(group, pageState.page, pageState.isLogged);
  };

  const onClickPage = (page: number) => {
    storage.setSavedPage(`${page}`);
    return getItems(pageState.group, page, pageState.isLogged);
  };

  const onClickItem = (wordId: string) => {
    return setPageState({ ...pageState, currentId: wordId });
  };

  const notStudiedWords = () => {
    if (pageState.isLogged) {
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

  const onClickLinkGame = (game: Games) => {
    navigate(`/games`, {
      state: {
        group: pageState.group,
        page: pageState.page,
        isLogged: pageState.isLogged,
        items: notStudiedWords(),
        game,
      },
    });
  };

  const onClickWordCardButton = (
    isUserWord: boolean,
    wordId: string,
    difficulty: Difficulty,
    goals: number
  ) => {
    let queryResult: Promise<Response>;
    if (isUserWord) {
      queryResult = QueryService.updateUserWords(userId, wordId, {
        difficulty,
        optional: { goals },
      });
    } else {
      queryResult = QueryService.addUserWords(userId, wordId, {
        difficulty,
        optional: { goals },
      });
    }
    let newWordId = wordId;

    if (pageState.group > 5) {
      newWordId = "";
    }

    queryResult.then(
      () => {
        return getItems(
          pageState.group,
          pageState.page,
          pageState.isLogged,
          newWordId
        );
      },
      (error) => {
        onError(error as string);
      }
    );
  };

  return (
    <Container
      sx={{
        marginTop: "1rem",
      }}
      maxWidth="lg"
      disableGutters
    >
      {pageState.isLoaded && (
        <TextbookTabs
          initialGroup={pageState.group}
          groupsColor={groupsColor.filter((color, id) =>
            pageState.isLogged ? true : id < 6
          )}
          onClickTab={onClickTab}
        />
      )}
      <Grid
        sx={{
          marginTop: "1rem",
          alignItems: "center",
          marginLeft: "auto",
        }}
        container
        spacing={2}
      >
        <Grid item xs={6}>
          {pageState.isPageStudied && pageState.group < 7 && (
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ marginBottom: "1rem", textAlign: "center" }}
            >
              Page is studied!
            </Typography>
          )}
          {!pageState.isPageStudied && pageState.group < 7 && (
            <GameButton onClickLinkGame={onClickLinkGame} />
          )}
          <TextbookWords
            items={pageState.items}
            isLoaded={pageState.isLoaded}
            isLogged={pageState.isLogged}
            error={pageState.error}
            color={groupsColor[pageState.group]}
            colorHard={red[500]}
            colorStudied={green[500]}
            isHardWords={pageState.group === 6}
            isStudiedWords={pageState.group === 7}
            onClickItem={onClickItem}
          />
        </Grid>
        <Grid item xs={6}>
          <WordCard
            isLogged={pageState.isLogged}
            color={groupsColor[pageState.group]}
            item={
              pageState.items.find(
                (item) => item.id === pageState.currentId
              ) as IUserWord
            }
            onClickWordCardButton={onClickWordCardButton}
          />
        </Grid>
      </Grid>
      <TextbookPagination
        page={pageState.page}
        isPageStudied={pageState.isPageStudied}
        color={groupsColor[pageState.group]}
        onClickPage={onClickPage}
      />
    </Container>
  );
}
