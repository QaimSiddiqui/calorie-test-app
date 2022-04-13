import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from 'shared/ui/elements/modal';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  foodName?: string;
  isLoading?: boolean;
}
export default function DeleteConfirmationModal({
  open,
  onClose,
  foodName,
  onSubmit,
  isLoading = false,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this {foodName} entry ?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={onSubmit}>
          Confirm
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
}
