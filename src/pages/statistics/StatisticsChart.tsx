import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DataChart } from "../../common/types/chartTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.size = 24;

export interface Props {
  statistics: DataChart[];
}

const options = (game: string) => {
  return {
    plugins: {
      title: {
        display: true,
        text: game,
        font: {
          size: 32,
        },
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
};

export function StatisticsChart({ statistics }: Props) {
  return (
    <>
      {statistics.map((game, id) => (
        <Card key={id}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ marginBottom: "0.25rem", textAlign: "center" }}
            >
              <Bar options={options(game.title)} data={game.data} />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
