Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow } from '@mui/material';

const LogTableHead = ({ userIsAdmin }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Time</TableCell>
        {userIsAdmin && <TableCell>Channel</TableCell>}
        {userIsAdmin && <TableCell>User</TableCell>}
        <TableCell>Token</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Model</TableCell>
        <TableCell>Hint</TableCell>
        <TableCell>Completion</TableCell>
        <TableCell>Quota</TableCell>
        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LogTableHead;

LogTableHead.propTypes = {
  userIsAdmin: PropTypes.bool
};".