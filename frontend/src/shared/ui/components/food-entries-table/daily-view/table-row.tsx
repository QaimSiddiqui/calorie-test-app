import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import format from 'date-fns/format';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'shared/hooks/use-modal';
import { useDeleteFoodEntry } from 'shared/service/food-entries.hooks';
import { useTokenContext } from 'shared/service/token.context';
import { FoodEntryType } from 'shared/types/calories';
import { TableCell, TableRow } from 'shared/ui/elements/table';
import DeleteConfirmationModal from '../delete-confirmation.modal';

interface Props {
  foodEntry: FoodEntryType;
  hideActions?: boolean;
  userName?: string;
}

function FoodEntryRow({ foodEntry, hideActions = false, ...props }: Props) {
  const navigate = useNavigate();
  const { decodedToken } = useTokenContext();
  const { isOpen, actions, context } = useModal();
  const { mutate, isLoading } = useDeleteFoodEntry();

  return (
    <Fragment>
      <TableRow key={foodEntry._id}>
        <TableCell component="th" scope="row">
          {foodEntry.productName}
        </TableCell>
        <TableCell align="right">{foodEntry.calories}</TableCell>
        <TableCell align="right">${foodEntry.price}</TableCell>
        <TableCell align="right">
          {format(new Date(foodEntry.date), 'yyyy-MM-dd')}
        </TableCell>
        {decodedToken?.role === 'admin' && (
          <TableCell align="right">{foodEntry.createdBy?.name}</TableCell>
        )}
        {!hideActions && (
          <TableCell align="right">
            <IconButton
              aria-label="edit"
              size="small"
              sx={{
                color: 'secondary.dark',
              }}
              onClick={() => navigate(`/food-entry/${foodEntry._id}/edit`)}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                color: 'red',
              }}
              onClick={() => actions.open(foodEntry)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <DeleteConfirmationModal
        open={isOpen}
        onClose={actions.close}
        foodName={context?.productName}
        isLoading={isLoading}
        onSubmit={() => {
          mutate(context?._id);
          actions.close();
        }}
      />
    </Fragment>
  );
}

export default FoodEntryRow;
