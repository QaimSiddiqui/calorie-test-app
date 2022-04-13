import { Fragment } from 'react';
import { FoodEntryType } from 'shared/types/calories';
import Loader from 'shared/ui/components/loader';
import { TableCell, TableRow } from 'shared/ui/elements/table';
import FoodEntryRow from './table-row';

interface Props {
  foodEntries: FoodEntryType[];
  dataLoading: boolean;
  hideActions?: boolean;
}

export default function DailyViewBody({
  foodEntries,
  dataLoading,
  hideActions = false,
}: Props) {
  if (dataLoading) {
    return <Loader />;
  }
  if (foodEntries.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6}>No food entries found</TableCell>
      </TableRow>
    );
  }
  return (
    <Fragment>
      {foodEntries?.map((foodEntry: FoodEntryType) => (
        <FoodEntryRow foodEntry={foodEntry} hideActions={hideActions} />
      ))}
    </Fragment>
  );
}
