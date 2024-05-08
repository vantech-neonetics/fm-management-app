// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Card,
  CardContent,
  // Grid,
  // LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
  // linearProgressClasses
} from '@mui/material';
import User1 from 'assets/images/users/user-round.svg';
import { useNavigate } from 'react-router-dom';

// assets
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 30,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: '#fff'
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.primary.main
//   }
// }));

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.typography.menuChip.background,
  marginBottom: '22px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '157px',
    height: '157px',
    background: theme.palette.primary[200],
    borderRadius: '50%',
    top: '-105px',
    right: '-96px'
  }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

// function LinearProgressWithLabel({ value, ...others }) {
//   const theme = useTheme();

//   return (
//     <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
//       <Grid item>
//         <Grid container justifyContent="space-between">
//           <Grid item>
//             <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
//               Progress
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>// LinearProgressWithLabel.propTypes = {
//   value: PropTypes.number
// };

// ==============================|| SIDEBAR MENU Card ||============================== //