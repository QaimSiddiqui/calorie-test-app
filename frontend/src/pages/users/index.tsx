import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import Table from 'shared/ui/elements/table';
import { useUsers } from './service/users.hooks';
import UsersTableBody from './ui/user-table-body';

export function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: users, isLoading } = useUsers({
    page: page + 1,
    limit: rowsPerPage,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const limit = parseInt(event.target.value, 10);
    setRowsPerPage(limit);
    setPage(0);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            columnGap: 2,
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginY: '30px',
            }}
            component="p"
            color="primary"
          >
            Users
          </Typography>
        </Box>
      </Box>
      <Table
        headers={['Name', 'Email', 'Avg Calories Per Week', 'Role']}
        body={
          <UsersTableBody
            users={users?.results || []}
            dataLoading={isLoading}
          />
        }
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsLength={users?.totalResults || 0}
      />
    </Box>
  );
}
