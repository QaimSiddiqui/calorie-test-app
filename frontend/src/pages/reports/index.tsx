import { useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { useFoodEntries } from 'shared/service/food-entries.hooks';
import FoodEntriesTable from 'shared/ui/components/food-entries-table/daily-view';
import Filters from './ui/filter';

export function Reports() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: foodEntries,
    isLoading,
    isFetching,
  } = useFoodEntries({
    startDate,
    endDate,
    page: page + 1,
    limit: rowsPerPage,
  });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            columnGap: 2,
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginY: '30px',
            }}
            component="p"
            color="primary"
          >
            Reports
          </Typography>
          {isFetching && <CircularProgress size={20} />}
        </Box>
      </Box>
      <Filters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <FoodEntriesTable
        foodEntries={foodEntries?.results || []}
        totalRecords={foodEntries?.totalResults || 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        dataLoading={isLoading}
        hideActions={true}
      />
    </Box>
  );
}
