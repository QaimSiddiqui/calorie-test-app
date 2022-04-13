import { Fragment } from 'react';

import { UserType } from 'shared/types/auth';
import Loader from 'shared/ui/components/loader';
import { TableCell, TableRow } from 'shared/ui/elements/table';

interface Props {
  users: UserType[];
  dataLoading: boolean;
}

export default function UsersTableBody({ users, dataLoading }: Props) {
  if (dataLoading) {
    return <Loader />;
  }
  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4}>No users found</TableCell>
      </TableRow>
    );
  }
  return (
    <Fragment>
      {users?.map((user: UserType) => (
        <TableRow key={user._id}>
          <TableCell component="th" scope="row">
            {user.name}
          </TableCell>
          <TableCell align="right">{user.email}</TableCell>
          <TableCell align="right">{user.avgCaloriesPerWeek}</TableCell>
          <TableCell align="right">{user.role}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
}
