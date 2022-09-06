export type StatDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  stack: string;
};

export type DataChart = {
  title: string;
  data: { labels: string[]; datasets: StatDataset[] };
};
