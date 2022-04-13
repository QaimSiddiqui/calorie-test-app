import {
  Paper,
  Table as MaterialTable,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow as MaterialTableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MaterialTableCell, { tableCellClasses } from '@mui/material/TableCell';

export const TableCell = styled(MaterialTableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const TableRow = styled(MaterialTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Props {
  headers: string[];
  body?: React.ReactNode;
  rowsPerPageOptions?: number[];
  rowsLength?: number;
  rowsPerPage?: number;
  page?: number;
  hidePagination?: boolean;
  headerBgColor?: string;
  headerTextColor?: string;
  handleChangePage?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function Table({
  headers,
  body,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  rowsLength = 0,
  rowsPerPage = 10,
  page = 0,
  handleChangePage = () => {},
  handleChangeRowsPerPage = () => {},
  hidePagination = false,
  headerBgColor = 'secondary.dark',
  headerTextColor = 'common.white',
}: Props) {
  return (
    <TableContainer component={Paper} sx={{ width: '100%', my: 2 }}>
      <MaterialTable sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <MaterialTableRow>
            {headers.map((header, index) => (
              <TableCell
                key={header}
                align={index === 0 ? 'left' : 'right'}
                sx={{
                  backgroundColor: headerBgColor,
                  color: headerTextColor,
                }}
              >
                {header}
              </TableCell>
            ))}
          </MaterialTableRow>
        </TableHead>
        <TableBody>{body}</TableBody>
      </MaterialTable>
      {rowsLength > 0 && !hidePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}
