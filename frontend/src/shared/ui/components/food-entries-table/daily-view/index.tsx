import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTokenContext } from 'shared/service/token.context';
import { FoodEntryType } from 'shared/types/calories';
import Table from 'shared/ui/elements/table';
import DailyViewBody from './table-body';

interface Props {
  foodEntries: FoodEntryType[];
  totalRecords?: number;
  setPage?: (page: number) => void;
  setRowsPerPage?: (rowsPerPage: number) => void;
  dataLoading?: boolean;
  hideActions?: boolean;
  hidePagination?: boolean;
  headerBgColor?: string;
  headerTextColor?: string;
}

function FoodEntriesTable({
  foodEntries,
  totalRecords,
  dataLoading,
  hideActions = false,
  hidePagination = false,
  headerBgColor,
  headerTextColor,
  ...props
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { decodedToken } = useTokenContext();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    props.setPage?.(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const limit = parseInt(event.target.value, 10);
    setRowsPerPage(limit);
    props.setRowsPerPage?.(limit);
    setPage(0);
    props.setPage?.(0);
  };

  const headers = useMemo(() => {
    const list = ['FOOD', 'CALORIES', 'PRICE', 'DATE'];
    if (decodedToken?.role === 'admin') {
      list.push('CUSTOMER');
    }
    if (!hideActions) {
      list.push('ACTIONS');
    }
    return list;
  }, [decodedToken?.role, hideActions]);

  return (
    <Box>
      <Table
        headers={headers}
        body={
          <DailyViewBody
            foodEntries={foodEntries}
            dataLoading={dataLoading || false}
            hideActions={hideActions}
          />
        }
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsLength={totalRecords}
        hidePagination={hidePagination}
        headerBgColor={headerBgColor}
        headerTextColor={headerTextColor}
      />
    </Box>
  );
}

export default FoodEntriesTable;
