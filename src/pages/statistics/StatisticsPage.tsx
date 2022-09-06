import { useEffect, useState } from "react";

import { Grid, Container } from "@mui/material";
import { orange, green, cyan, blue, pink } from "@mui/material/colors";

import { StatisticsTabs } from "./StatisticsTabs";
import { StatisticsChart } from "./StatisticsChart";
import { query as QueryService } from "../../service/API";
import StorageWrapper from "../../components/storageWrapper";
import { IUserStatistics } from "../../common/interfaces/userStatistics";
import { IStatisticsResult } from "../../common/interfaces/statisticsResult";
import { statisticsAdapter } from "../../service/APIHelper";
import { Games } from "../../common/enums/games";
import { UserStatGame } from "../../common/types/userStatisticsGame";
import { DataChart, StatDataset } from "../../common/types/chartTypes";

const checkAuthorization = async (id: string) => {
  return await QueryService.getUser(id);
};

export function StatisticsPage() {
  const storage = StorageWrapper.getInstance();
  const statisticsTubs: string[] = ["game statistics", "word statistics"];

  const userId: string | null = storage.getSavedUser() as string;

  const [pageState, setPageState] = useState({
    isLogged: userId ? true : false,
    groupStatistics: 0,
    error: "",
    isLoaded: false,
    statisticsGames: [] as DataChart[],
    statisticsWords: [] as DataChart[],
  });

  const onError = (error: string): void => {
    setPageState({
      ...pageState,
      isLoaded: true,
      statisticsGames: [] as DataChart[],
      statisticsWords: [] as DataChart[],
      error: error,
    });
  };

  const data = (game: UserStatGame) => {
    const arr = Object.keys(game);
    const labels: string[] = [];
    const datasets: StatDataset[] = [
      {
        label: "New words",
        data: [],
        backgroundColor: cyan[400],
        stack: "Stack 0",
      },
      {
        label: "Studied words",
        data: [],
        backgroundColor: blue[400],
        stack: "Stack 0",
      },
      {
        label: "True words",
        data: [],
        backgroundColor: green[400],
        stack: "Stack 0",
      },
      {
        label: "The longest series",
        data: [],
        backgroundColor: orange[400],
        stack: "Stack 0",
      },
      {
        label: "% of true answers",
        data: [],
        backgroundColor: pink[400],
        stack: "Stack 1",
      },
    ];
    game[arr[0]].forEach((item) => {
      labels.push(`${item.day}.${item.month}.${item.year}`);
      datasets[0].data.push(item.newWords);
      datasets[1].data.push(item.learnedWords);
      datasets[2].data.push(item.trueWords);
      datasets[3].data.push(item.longSeries);
      datasets[4].data.push(
        Math.round((item.trueWords / item.totalWords) * 100)
      );
    });
    return {
      labels,
      datasets,
    };
  };

  const setDataChart = (statistics: UserStatGame[]): DataChart[] => {
    const result: DataChart[] = [];
    statistics.forEach((game) => {
      const arr = Object.keys(game);
      result.push({ title: arr[0].toLocaleUpperCase(), data: data(game) });
    });
    return result;
  };

  const statisticForGames = (data: IUserStatistics[]): UserStatGame[] => {
    const result: UserStatGame[] = [
      { [Games.SPRINT]: [] },
      { [Games.AUDIOCALL]: [] },
    ];
    result.forEach((element) => {
      const arr = Object.keys(element);
      arr.forEach((key) => {
        data.map((item) => {
          if (item.game === key) {
            const { game, year, month, day } = item;
            const lastItem = element[key].find(
              (elem) =>
                elem.game === game &&
                elem.year === year &&
                elem.month === month &&
                elem.day === day
            );
            if (lastItem) {
              lastItem.learnedWords += item.learnedWords;
              lastItem.longSeries = Math.max(
                lastItem.longSeries,
                item.longSeries
              );
              lastItem.totalWords += item.totalWords;
              lastItem.newWords += item.newWords;
              lastItem.trueWords += item.trueWords;
            } else {
              element[key].push({ ...item });
            }
          }
        });
      });
    });

    return result;
  };

  const statisticForWords = (data: IUserStatistics[]): UserStatGame[] => {
    const result: IUserStatistics[] = [];
    data.map((item) => {
      const { year, month, day } = item;
      const lastItem = result.find(
        (elem) => elem.year === year && elem.month === month && elem.day === day
      );
      if (lastItem) {
        lastItem.learnedWords += item.learnedWords;
        lastItem.longSeries = Math.max(lastItem.longSeries, item.longSeries);
        lastItem.totalWords += item.totalWords;
        lastItem.newWords += item.newWords;
        lastItem.trueWords += item.trueWords;
      } else {
        result.push({ ...item });
      }
    });

    return [{ words: result }];
  };

  const getItems = (groupStatistics = 0, isLogged = false): void => {
    let queryResult: Promise<IStatisticsResult>;
    if (!isLogged) {
      onError("You are not authorized");
      return;
    } else {
      queryResult = QueryService.getUserStats(userId);
    }

    queryResult.then(
      (result) => {
        if (result) {
          const statistics = statisticsAdapter(result);
          if (statistics.length > 0) {
            setPageState({
              ...pageState,
              isLogged,
              groupStatistics,
              isLoaded: true,
              statisticsGames: setDataChart(statisticForGames(statistics)),
              statisticsWords: setDataChart(statisticForWords(statistics)),
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
          onError("You are not authorized");
        } else {
          getItems(pageState.groupStatistics, true);
        }
      })
      .catch((error) => {
        onError(error as string);
      });
  }, []);

  const onClickTab = (groupStatistics: number): void => {
    setPageState({
      ...pageState,
      groupStatistics,
    });
  };

  return (
    <Container
      sx={{
        marginTop: "1rem",
      }}
      maxWidth="xl"
      disableGutters
    >
      {pageState.isLoaded && (
        <StatisticsTabs
          statisticsTubs={statisticsTubs}
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
        <Grid item xs={12}>
          {pageState.groupStatistics === 0 && (
            <StatisticsChart statistics={pageState.statisticsGames} />
          )}
        </Grid>
        <Grid item xs={12}>
          {pageState.groupStatistics === 1 && (
            <StatisticsChart statistics={pageState.statisticsWords} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
