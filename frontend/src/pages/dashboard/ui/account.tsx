import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';
import { useTokenContext } from 'shared/service/token.context';
import { UserType } from '../../../shared/types/auth';
function Account({
  name,
  email,
  dailyCaloriesLimit,
  monthlyMoneyLimit,
}: Partial<UserType>) {
  const { decodedToken } = useTokenContext();
  return (
    <Box
      sx={{
        marginTop: '50px',
        marginBottom: '20px',
      }}
    >
      <Typography variant="h4" component="p" color="secondary">
        {name}
      </Typography>
      <Typography variant="body1" component="p" color="black">
        {email}
      </Typography>
      {decodedToken?.role !== 'admin' && (
        <Fragment>
          <Typography variant="body1" component="p" color="black">
            Calories limit: {dailyCaloriesLimit?.toFixed(2)} / per day
          </Typography>
          <Typography variant="body1" component="p" color="black">
            Expense's limit: {monthlyMoneyLimit?.toFixed(2)} / per month
          </Typography>
        </Fragment>
      )}
    </Box>
  );
}

export default Account;
