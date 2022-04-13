import { useMemo } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}
export function DailyFilters({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}: Props) {
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
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          maxDate={maxDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          maxDate={maxDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
