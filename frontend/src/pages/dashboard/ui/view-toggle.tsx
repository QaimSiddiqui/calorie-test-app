import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import DailyImg from 'shared/assets/daily.png';
import MonthImg from 'shared/assets/month.png';
interface Props {
  viewType: 'daily' | 'month';
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'daily' | 'month',
  ) => void;
}
export default function ViewToggle({ viewType, onChange }: Props) {
  return (
    <ToggleButtonGroup
      value={viewType}
      exclusive
      onChange={onChange}
      aria-label="View Toggle"
    >
      <ToggleButton value="daily" aria-label="left aligned">
        <img
          src={DailyImg}
          alt="Daily"
          height="24px"
          width="24px"
          style={{
            marginRight: '8px',
          }}
        />{' '}
        <Typography variant="body2" component="span">
          Daily Summary
        </Typography>
      </ToggleButton>
      <ToggleButton value="month" aria-label="centered">
        <img
          src={MonthImg}
          alt="Month"
          height="24px"
          width="24px"
          style={{
            marginRight: '8px',
          }}
        />{' '}
        <Typography variant="body2" component="span">
          Monthly Summary
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
