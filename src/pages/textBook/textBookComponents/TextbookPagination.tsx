import { Stack, Pagination } from "@mui/material";

interface Props {
  page: number;
  isPageStudied: boolean;
  color: string;
  onClickPage: (id: number) => void;
}

export function TextbookPagination({
  page,
  isPageStudied,
  color,
  onClickPage,
}: Props) {
  const handleChangePage = (_ev: object, pg: number) => {
    onClickPage(pg - 1);
  };

  return (
    <Stack sx={{ marginTop: "1rem", alignItems: "center" }} spacing={2}>
      <Pagination
        sx={{
          boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`,
        }}
        count={30}
        page={page + 1}
        variant="outlined"
        shape="rounded"
        color={isPageStudied ? "primary" : "standard"}
        onChange={handleChangePage}
      />
    </Stack>
  );
}