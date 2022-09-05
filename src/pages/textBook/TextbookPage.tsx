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

import { TextbookPagination } from "./textBookComponents/TextbookPagination";
import { TextbookTabs } from "./textBookComponents/TextbookTabs";
import { TextbookWords } from "./textBookComponents/TextbookWords";
import { WordCard } from "./textBookComponents/WordCard";
import { query as QueryService } from "../../service/API";
import { wordsAdapter } from "../../service/APIHelper";
import { IWord } from "../../common/interfaces/word";
import { IUserWord } from "../../common/interfaces/userWord";
import StorageWrapper from "../../components/storageWrapper";
import { Difficulty } from "../../common/enums/difficulty";
import { IAggregateResult } from "../../common/interfaces/aggregateResult";
import { GameButton } from "./textBookComponents/GameButton";
import { IAggregateWord } from "../../common/interfaces/aggregateWord";

// const checkAuthorization = async (id: string) => {
//   return await QueryService.getUser(id);
// };

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
  // const isLogged = !!userId;

  const [pageState, setPageState] = useState({
    isLogged: !!userId,
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
    let queryResult: Promise<IAggregateWord[] | IAggregateResult[]>;
    if (!isLogged) {
      queryResult = QueryService.getWordsPage(group, page);
    } else {
      if (group < 6) {
        queryResult = QueryService.getAggregatedWordsByFilter(
          userId,
          group,
          page,
          []
        );
      } else {
        queryResult = QueryService.getAggregatedWordsByFilter(
          userId,
          group,
          page,
          group === 6 ? [Difficulty.HARD] : [Difficulty.STUDIED]
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
  useEffect(() => {
    if (pageState.group > 5) {
      getItems(0, 0, false);
    } else {
      getItems(pageState.group, pageState.page, false);
    }
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

  const onClickLinkGame = (link: string) => {
    checkWordsList(); //check if there studied words
    navigate(`/games`, { state: { items: pageState.items } });
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

  // Sprint settings

  const checkWordsList = () => {
    const getWordsFromPrevPage = async (
      group: number,
      page: number
    ): Promise<IWord[]> => {
      return await QueryService.getWordsPage(group, page);
    };

    if (pageState.isLogged) {
      const notStudiedWords: IUserWord[] = [];
      for (let i = 0; i < pageState.items.length; i++) {
        if (pageState.items[i].difficulty !== "studied") {
          notStudiedWords.push(pageState.items[i]);
        }
      }

      if (notStudiedWords.length < 20) {
        if (pageState.page - 1 < 0) {
          pageState.items = notStudiedWords;
        } else {
          const resp = getWordsFromPrevPage(
            pageState.group,
            pageState.page - 1
          );
          resp
            .then((response) => {
              let j = 0;
              const adaptResponse = wordsAdapter(response);

              while (notStudiedWords.length < 20) {
                if (adaptResponse[j] !== undefined) {
                  notStudiedWords.push(adaptResponse[j]);
                } else {
                  return;
                }
                j++;
              }
              pageState.items = notStudiedWords;
            })
            .catch((error) => {
              onError(error as string);
            });
        }
      }
    }
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
          onClickTab={() => onClickTab(pageState.group)}
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