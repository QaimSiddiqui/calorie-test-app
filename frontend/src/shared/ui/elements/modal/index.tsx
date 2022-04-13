import MaterialDialog from '@mui/material/Dialog';
import { Breakpoint } from '@mui/material';
export interface Props {
  open: boolean;
  onClose: (value?: string) => void;
  children: React.ReactNode;
  maxWidth?: Breakpoint;
  maxHeight?: string | number;
}

export default function Modal({
  open,
  onClose,
  maxWidth = 'xs',
  maxHeight = 435,
  children,
}: Props) {
  return (
    <MaterialDialog
      sx={{ '& .MuiDialog-paper': { maxHeight } }}
      maxWidth={maxWidth}
      open={open}
      onClose={() => onClose()}
      onBackdropClick={() => onClose()}
    >
      {children}
    </MaterialDialog>
  );
}
