import { Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import format from 'date-fns/format';
import { useModal } from 'shared/hooks/use-modal';
import { useTokenContext } from 'shared/service/token.context';
import { MonthFoodEntryTypes } from 'shared/types/calories';
import { TableCell, TableRow } from 'shared/ui/elements/table';
import DateDetailsModal from './date-details.modal';
interface Props extends MonthFoodEntryTypes {
  userDailyCaloriesLimit: number;
}
export default function MonthViewRow({
  _id: date,
  totalAmount,
  totalCalories,
  userDailyCaloriesLimit,
  results,
}: Props) {
  const { decodedToken } = useTokenContext();
  const { isOpen, actions, context } = useModal();
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {format(new Date(results[0].date), 'yyyy-MM-dd')}
        </TableCell>
        <TableCell align="right">
          <Typography variant="inherit" component="span">
            {totalCalories.toFixed(2)}{' '}
          </Typography>
          {decodedToken?.role !== 'admin' &&
            totalAmount > userDailyCaloriesLimit && (
              <Typography variant="caption" component="p" color="red">
                Consumed more than daily limit
              </Typography>
            )}
        </TableCell>
        <TableCell align="right">${totalAmount.toFixed(2)}</TableCell>
        <TableCell align="right">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              actions.open({
                date: results[0].date,
              })
            }
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <DateDetailsModal
        open={isOpen}
        onClose={actions.close}
        date={new Date(context?.date)}
      />
    </Fragment>
  );
}
