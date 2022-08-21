import { useEffect, useState } from "react";

import { Grid, Container } from "@mui/material";
import { TextbookPagination } from "./TextbookPagination";
import { TextbookTabs } from "./TextbookTabs";
import { TextbookWords } from "./TextbookWords";
import { WordCard } from "./WordCard";
import { query as QueryService } from "../../service/API";
import { wordsAdapter, getWordsForTextbook } from "../../service/wordsAdapter";
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
} from "@mui/material/colors";
import { Difficulty } from "../../common/enums/difficulty";
import { IAggregateResult } from "../../common/interfaces/aggregateResult";

export function TextbookPage() {
  const storage = StorageWrapper.getInstance();
  const userId: string | null = storage.getSavedUser();
  const initialGroup: string | null = storage.getSavedGroup();
  const initialPage: string | null = storage.getSavedPage();
  const [group, setGroup] = useState<number>(initialGroup ? +initialGroup : 0);
  const [page, setPage] = useState<number>(initialPage ? +initialPage : 0);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([] as IUserWord[]);
  const [currentId, setCurrentId] = useState("");
  const groupsColor: string[] = [
    lime[400],
    orange[400],
    green[400],
    cyan[400],
    blue[400],
    purple[400],
    pink[400],
  ];

  const getItems = () => {
    let queryResult: Promise<
      [IWord[], IAggregateResult[]] | IAggregateResult[]
    >;
    if (group < 6) {
      // queryResult = QueryService.getWordsPage(group, page);
      queryResult = getWordsForTextbook(userId as string, group, page);
    } else {
      queryResult = QueryService.getAggregatedWordsByFilter(
        userId as string,
        `{userWord.difficulty:${Difficulty.HARD}}`
      );
    }

    queryResult.then(
      (result) => {
        const words = wordsAdapter(result);
        setIsLoaded(true);
        setItems(words);
        if (words.length > 0) {
          setCurrentId(words[0].id);
        }
      },
      (error) => {
        setIsLoaded(true);
        setError(error as string);
      }
    );
  };

  useEffect(() => {
    getItems();
  }, []);

  const onClickTab = (group: number) => {
    getItems();
    storage.setSavedGroup(`${group}`);
    return setGroup(group);
  };

  const onClickPage = (page: number) => {
    getItems();
    storage.setSavedPage(`${page}`);
    return setPage(page);
  };

  const onClickItem = (id: string) => {
    return setCurrentId(id);
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
        isLogged={userId ? true : false}
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
            items={items}
            isLoaded={isLoaded}
            error={error}
            color={groupsColor[group]}
            onClickItem={onClickItem}
          />
        </Grid>
        <Grid item xs={6}>
          <WordCard
            color={groupsColor[group]}
            item={items.find((item) => item.id === currentId) as IUserWord}
          />
        </Grid>
      </Grid>
      <TextbookPagination
        page={page ? +page : 0}
        color={groupsColor[group]}
        onClickPage={onClickPage}
      />
    </Container>
  );
}
