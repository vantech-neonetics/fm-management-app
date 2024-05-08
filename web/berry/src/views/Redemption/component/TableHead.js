```js
import { TableCell, TableHead, TableRow } from '@mui/material';

const RedemptionTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Creation Time</TableCell>
        <TableCell>Redemption Time</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default RedemptionTableHead;
```