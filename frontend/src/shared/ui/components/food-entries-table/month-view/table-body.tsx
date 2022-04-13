import { Fragment } from 'react';
import { MonthFoodEntryTypes } from 'shared/types/calories';
import Loader from 'shared/ui/components/loader';
import { TableCell, TableRow } from 'shared/ui/elements/table';
import MonthViewRow from './table-row';

interface Props {
  data: MonthFoodEntryTypes[];
  dataLoading: boolean;
  userDailyCaloriesLimit: number;
}

export default function MonthViewBody({
  data,
  dataLoading,
  userDailyCaloriesLimit,
}: Props) {
  if (dataLoading) {
    return <Loader />;
  }
  if (data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5}>No food entries found</TableCell>
      </TableRow>
    );
  }
  return (
    <Fragment>
      {data?.map((month: MonthFoodEntryTypes) => (
        <MonthViewRow
          {...month}
          userDailyCaloriesLimit={userDailyCaloriesLimit}
        />
      ))}
    </Fragment>
  );
}
