import { TableCell, TableHead, TableRow } from '@mui/material';

const UsersTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Group</TableCell>
        <TableCell>Statistics</TableCell>
        <TableCell>User Role</TableCell>
        <TableCell>Binding</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Operation</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default UsersTableHead;