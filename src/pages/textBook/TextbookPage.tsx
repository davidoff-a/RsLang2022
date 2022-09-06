import { useEffect, useState } from "react";

import { Grid, Container } from "@mui/material";
import { TextbookPagination } from "./TextbookPagination";

import { TextbookTabs } from "./TextbookTabs";
import { TextbookWords } from "./TextbookWords";
import { WordCard } from "./WordCard";
import { query as QueryService } from "../../service/API";
import { IWord } from "../../common/interfaces/word";

export function TextbookPage() {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([] as IWord[]);
  const [currentId, setCurrentId] = useState("");

  const getItems = () => {
    QueryService.getWordsPage(group, page).then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
        if (result.length > 0) {
          setCurrentId(result[0].id);
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
    return setGroup(group);
  };

  const onClickPage = (page: number) => {
    getItems();
    return setPage(page);
  };

  const onClickLinkGame = () => {
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
    goals: number,
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
      newWordId = '';
    }

    queryResult.then(
      () => {
        return getItems(
          pageState.group,
          pageState.page,
          pageState.isLogged,
          newWordId,
        );
      },
      error => {
        onError(error as string);
      },
    );
  };

      page: number,
        if (pageState.items[i].difficulty !== 'studied') {
            pageState.page - 1,
            .then(response => {
            .catch(error => {
  const textBookLabel = (group: number, state: boolean) => {
    if (group < 7) {
      if (state) {
        return (
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ marginBottom: '1rem', textAlign: 'center' }}
          >
            Page is studied!
          </Typography>
        );
      }
      return <GameButton onClickLinkGame={onClickLinkGame} />;
    }
  };

  const getGroupsColor = () => {
    return groupsColor.filter((color, id) =>
      pageState.isLogged ? true : id < 6,
    );
  };
  return (
    <Container maxWidth="sm">
      <TextbookTabs onClickTab={onClickTab} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextbookWords
            items={items}
            isLoaded={isLoaded}
            error={error}
            onClickItem={onClickItem}
          />
        </Grid>
        <Grid item xs={6}>
          <WordCard
            item={items.find((item) => item.id === currentId) as IWord}
          />
        </Grid>
      </Grid>
      <TextbookPagination onClickPage={onClickPage} />
    </Container>
  );
}