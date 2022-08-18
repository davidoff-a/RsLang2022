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

  const onClickItem = (id: string) => {
    return setCurrentId(id);
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
