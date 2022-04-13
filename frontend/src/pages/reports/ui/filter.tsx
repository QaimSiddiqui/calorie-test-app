import { useState } from 'react';

import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { sub, startOfWeek, endOfWeek, subDays } from 'date-fns';
interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}
function Filters(props: Props) {
  const [startDate, setStartDate] = useState<Date | null>(props.startDate);
  const [endDate, setEndDate] = useState<Date | null>(props.endDate);
  const [selectedFilter, setSelectedFilter] = useState('today');

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedFilter(value);
    if (value === 'today') {
      props.setStartDate(new Date());
      props.setEndDate(new Date());
      return;
    }
    if (value === 'this-week') {
      props.setStartDate(startOfWeek(new Date()));
      props.setEndDate(endOfWeek(new Date()));
      return;
    }
    if (value === 'last-week') {
      props.setStartDate(sub(startOfWeek(new Date()), { days: 7 }));
      props.setEndDate(sub(endOfWeek(new Date()), { days: 7 }));
      return;
    }
    if (value === 'last-seven-days') {
      props.setStartDate(subDays(new Date(), 6));
      props.setEndDate(new Date());
      return;
    }
    if (value === 'last-seven-days-from-yesterday') {
      props.setStartDate(sub(new Date(), { days: 7 }));
      props.setEndDate(sub(new Date(), { days: 1 }));
      return;
    }
    if (value === 'week-before-last-seven-days') {
      props.setStartDate(sub(new Date(), { days: 14 }));
      props.setEndDate(sub(new Date(), { days: 7 }));
      return;
    }
    if (value === 'custom-range') {
      const start = startOfWeek(new Date());
      const end = endOfWeek(new Date());
      props.setStartDate(start);
      props.setEndDate(end);
      setStartDate(start);
      setEndDate(end);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 120,
        maxWidth: 400,
      }}
    >
      <Box>
        <FormControl fullWidth>
          <InputLabel id="report-filters-label">Filters</InputLabel>
          <Select
            labelId="report-filters-label"
            id="report-filters"
            value={selectedFilter}
            label="Filters"
            onChange={handleChange}
          >
            <MenuItem value={'today'}>Today</MenuItem>
            <MenuItem value={'this-week'}>This Week</MenuItem>
            <MenuItem value={'last-week'}>Last Week</MenuItem>
            <MenuItem value={'last-seven-days'}>Last 7 Days</MenuItem>
            <MenuItem value={'last-seven-days-from-yesterday'}>
              Last 7 Days From Yesterday
            </MenuItem>
            <MenuItem value={'week-before-last-seven-days'}>
              Week Before Last 7 Days
            </MenuItem>
            <MenuItem value={'custom-range'}>Custom Range</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectedFilter === 'custom-range' && (
        <Box
          sx={{
            display: 'flex',
            columnGap: 2,
            marginTop: '20px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
                props.setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
                props.setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      )}
    </Box>
  );
}

export default Filters;
