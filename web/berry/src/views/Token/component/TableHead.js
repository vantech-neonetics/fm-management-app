import { TableCell, TableHead, TableRow } from '@mui/material';

const TokenTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Used Quota</TableCell>
        <TableCell>Remaining Quota</TableCell>
        <TableCell>Creation Time</TableCell>
        <TableCell>Expiration Time</TableCell>
        <TableCell>Operation</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TokenTableHead;