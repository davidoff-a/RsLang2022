import { Stack, Pagination } from "@mui/material";

export interface Props {
  // eslint-disable-next-line no-unused-vars
  onClickPage: (id: number) => void;
}

export function TextbookPagination({ onClickPage }: Props) {
  const handleChangePage = (_ev: object, pg: number) => {
    onClickPage(pg - 1);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={30}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
        sx={{marginTop: '10px'}}
      />
    </Stack>
  );
}
