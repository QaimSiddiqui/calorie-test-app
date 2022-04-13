import { useMemo } from 'react';

import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Props {
  selectedMonth: Date | null;
  setSelectedMonth: (date: Date | null) => void;
}
export function MonthFilters({ selectedMonth, setSelectedMonth }: Props) {
  const maxDate = useMemo(() => new Date(), []);
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 2,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Month"
          value={selectedMonth}
          views={['month', 'year']}
          onChange={setSelectedMonth}
          maxDate={maxDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
