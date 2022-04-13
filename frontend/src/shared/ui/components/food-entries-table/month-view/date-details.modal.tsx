import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { sub } from 'date-fns';
import { useState } from 'react';
import { useFoodEntries } from 'shared/service/food-entries.hooks';
import Modal from 'shared/ui/elements/modal';
import FoodEntriesDailyViewTable from 'shared/ui/components/food-entries-table/daily-view';

interface Props {
  open: boolean;
  onClose: () => void;

  date: Date;
}
export default function DateDetailsModal({ open, onClose, date }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: foodEntries, isLoading } = useFoodEntries({
    startDate: date,
    endDate: date,
    page: page + 1,
    limit: rowsPerPage,
  });
  return (
    <Modal open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Details</DialogTitle>
      <DialogContent dividers>
        <FoodEntriesDailyViewTable
          foodEntries={foodEntries?.results || []}
          totalRecords={foodEntries?.totalResults || 0}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          dataLoading={isLoading}
        />
      </DialogContent>
    </Modal>
  );
}
