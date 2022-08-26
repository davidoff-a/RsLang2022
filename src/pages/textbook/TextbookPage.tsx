import { useEffect, useState } from "react";

import { Grid, Container } from "@mui/material";
import { TextbookPagination } from "./TextbookPagination";
import { TextbookTabs } from "./TextbookTabs";
import { TextbookWords } from "./TextbookWords";
import { WordCard } from "./WordCard";
import { query as QueryService } from "../../service/API";
import { wordsAdapter, getWordsForTextbook } from "../../service/APIHelper";
import { IWord } from "../../common/interfaces/word";
import { IUserWord } from "../../common/interfaces/userWord";
import StorageWrapper from "../../components/storageWrapper";
import {
  lime,
  orange,
  green,
  cyan,
  blue,
  purple,
  pink,
  red,
} from "@mui/material/colors";
import { Difficulty } from "../../common/enums/difficulty";
import { IAggregateResult } from "../../common/interfaces/aggregateResult";

const checkAuthorization = async (id: string) => {
  return await QueryService.getUser(id);
};

export function TextbookPage() {
  const storage = StorageWrapper.getInstance();
  const groupsColor: string[] = [
    lime[400],
    orange[400],
    green[400],
    cyan[400],
    blue[400],
    purple[400],
    pink[400],
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
  });

  const getItems = (group = 0, page = 0, wordId?: string) => {
    const check = checkAuthorization(userId);
    void check.then((resultCheck) => {
      let queryResult: Promise<
        IWord[] | IAggregateResult[] | [IWord[], IAggregateResult[]]
      >;
      if (!resultCheck.ok) {
        queryResult = QueryService.getWordsPage(group, page);
      } else {
        if (pageState.group < 6) {
          queryResult = getWordsForTextbook(userId, group, page);
        } else {
          queryResult = QueryService.getAggregatedWordsByFilter(userId, [
            Difficulty.HARD,
            Difficulty.HARD,
            Difficulty.HARD,
          ]);
        }
      }
      queryResult.then(
        (result) => {
          const items = wordsAdapter(result);
          if (items.length > 0) {
            setPageState({
              ...pageState,
              isLogged: resultCheck.ok,
              group,
              page,
              isLoaded: true,
              items,
              currentId: wordId ? wordId : items[0].id,
            });
          } else {
            setPageState({
              ...pageState,
              isLogged: resultCheck.ok,
              group,
              page,
              isLoaded: true,
              items,
            });
          }
        },
        (error) => {
          setPageState({
            ...pageState,
            isLoaded: true,
            items: [] as IUserWord[],
            error: error as string,
          });
        }
      );
    });
  };

  useEffect(() => {
    getItems(pageState.group, pageState.page);
  }, []);

  const onClickTab = (group: number) => {
    storage.setSavedGroup(`${group}`);
    return getItems(group, pageState.page);
  };

  const onClickPage = (page: number) => {
    storage.setSavedPage(`${page}`);
    return getItems(pageState.group, page);
  };

  const onClickItem = (wordId: string) => {
    return setPageState({ ...pageState, currentId: wordId });
  };

  const onClickWordCardButton = (
    isUserWord: boolean,
    id: string,
    difficulty: Difficulty,
    goals: number
  ) => {
    let queryResult: Promise<Response>;
    if (isUserWord) {
      queryResult = QueryService.updateUserWords(userId, id, {
        difficulty,
        optional: { goals },
      });
    } else {
      queryResult = QueryService.addUserWords(userId, id, {
        difficulty,
        optional: { goals },
      });
    }

    queryResult.then(
      () => {
        return getItems();
      },
      (error) => {
        setPageState({ ...pageState, isLoaded: true, error: error as string });
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
      <TextbookTabs
        initialGroup={initialGroup ? +initialGroup : 0}
        groupsColor={groupsColor}
        isLogged={pageState.isLogged}
        onClickTab={onClickTab}
      />
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
          <TextbookWords
            items={pageState.items}
            isLoaded={pageState.isLoaded}
            isLogged={pageState.isLogged}
            error={pageState.error}
            color={groupsColor[pageState.group]}
            colorHard={red[500]}
            colorStudied={green[500]}
            isHardWords={pageState.group === 6}
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
        color={groupsColor[pageState.group]}
        onClickPage={onClickPage}
      />
    </Container>
  );
}
