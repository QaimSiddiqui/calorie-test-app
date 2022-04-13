import { useState } from 'react';

import { Button, Typography, Box, CircularProgress } from '@mui/material';
import sub from 'date-fns/sub';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { useFoodEntries } from 'shared/service/food-entries.hooks';
import FoodEntriesDailyViewTable from 'shared/ui/components/food-entries-table/daily-view';
import FoodEntriesMonthViewTable from 'shared/ui/components/food-entries-table/month-view';

import { DailyFilters } from './ui/daily-filters';
import { MonthFilters } from './ui/month-filters';
import ViewToggle from './ui/view-toggle';
import { useAccount } from '../../shared/service/account.hooks';
import Account from './ui/account';

export function Home() {
  const navigate = useNavigate();

  const [viewType, setViewType] = useState<'daily' | 'month'>('daily');

  // daily view states
  const [startDate, setStartDate] = useState<Date | null>(
    sub(new Date(), { days: 7 }),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // month view state
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());

  const {
    data: foodEntries,
    isLoading,
    isFetching,
  } = useFoodEntries({
    startDate,
    endDate,
    page: page + 1,
    limit: rowsPerPage,
    isMonthView: viewType === 'month',
    month: selectedMonth,
  });

  const { data: accountData } = useAccount();
  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'daily' | 'month',
  ) => {
    setViewType(newAlignment);
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Calorie Tracker Home Page" />
      </Helmet>
      <Box>
        <Account {...accountData} />
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
              Food Diary
            </Typography>
            {isFetching && <CircularProgress size={20} />}
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate('/food-entry/create')}
            color="secondary"
          >
            Add Food
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {viewType === 'daily' && (
            <DailyFilters
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
            />
          )}
          {viewType === 'month' && (
            <MonthFilters
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          )}
          <ViewToggle viewType={viewType} onChange={handleView} />
        </Box>
        {viewType === 'daily' && (
          <FoodEntriesDailyViewTable
            foodEntries={foodEntries?.results || []}
            totalRecords={foodEntries?.totalResults || 0}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            dataLoading={isLoading}
          />
        )}
        {viewType === 'month' && (
          <FoodEntriesMonthViewTable
            monthData={foodEntries?.monthData || []}
            dataLoading={isLoading}
          />
        )}
      </Box>
    </>
  );
}
