import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useAccount } from 'shared/service/account.hooks';
import { useTokenContext } from 'shared/service/token.context';
import { MonthFoodEntryTypes } from 'shared/types/calories';
import Table from 'shared/ui/elements/table';
import MonthViewBody from './table-body';

interface Props {
  monthData: MonthFoodEntryTypes[];
  dataLoading: boolean;
}

function FoodEntriesTable({ monthData, dataLoading }: Props) {
  const { data: accountData } = useAccount();
  const { decodedToken } = useTokenContext();
  const moneySpent = useMemo(() => {
    return monthData.reduce((acc, curr) => {
      return acc + curr.totalAmount;
    }, 0);
  }, [monthData]);
  return (
    <Box>
      {decodedToken?.role !== 'admin' && accountData?.monthlyMoneyLimit && (
        <Typography
          color={moneySpent > accountData?.monthlyMoneyLimit ? 'red' : 'black'}
          marginY="20px"
        >
          ${moneySpent.toFixed(2)} spent this month{' '}
          {moneySpent > accountData?.monthlyMoneyLimit
            ? '(limit exceeded)'
            : ''}
        </Typography>
      )}
      <Table
        headers={['Date', 'Calorie Consumed', 'Money Spent', 'Details']}
        body={
          <MonthViewBody
            data={monthData}
            dataLoading={dataLoading}
            userDailyCaloriesLimit={accountData?.dailyCaloriesLimit || 2.1}
          />
        }
        hidePagination={true}
      />
    </Box>
  );
}

export default FoodEntriesTable;
