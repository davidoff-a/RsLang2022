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
import {query, query as QueryService} from "../../service/API";
import { wordsAdapter, getWordsForTextbook } from "../../service/APIHelper";
import { IWord } from "../../common/interfaces/word";
import { IUserWord } from "../../common/interfaces/userWord";
import StorageWrapper from "../../components/storageWrapper";
import { Difficulty } from "../../common/enums/difficulty";
import { IAggregateResult } from "../../common/interfaces/aggregateResult";
import { GameButton } from "./textBookComponents/GameButton";
import {IAggregateWord} from "../../common/interfaces/aggregateWord";

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

  const convertToNumber = (param: string) => param?+param: 0;

  const [pageState, setPageState] = useState({
    isLogged: !!userId,
    group: convertToNumber(initialGroup), //group
    page: convertToNumber(initialPage), //page
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

  const getItems = async (
    group = 0,
    page = 0,
    wordId?: string
  ): Promise<IAggregateWord[]|IWord[]|[IAggregateResult[], IAggregateWord[]]> => {
    return await query.getWordsPage(group, page);
  };

  const getUserItems = (group = 0,
                        page = 0,
                        userId: string) => {
    if (!pageState.isLogged) {
      return QueryService.getWordsPage(group, page);
    } else {
      if (group < 6) {
        return getWordsForTextbook(userId, group, page);
      } else {
        return QueryService.getAggregatedWordsByFilter(
          userId,
          group === 6
            ? [Difficulty.HARD, Difficulty.HARD, Difficulty.HARD]
            : [Difficulty.STUDIED, Difficulty.STUDIED, Difficulty.STUDIED]
        );
      }
    }
  }

}