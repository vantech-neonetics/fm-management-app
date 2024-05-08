// material-ui
// Import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
// Import necessary hooks from 'react'
import { useEffect, useState } from 'react';
// Import Link from 'react-router-dom'
import { Link } from 'react-router-dom';

// material-ui
// Import 'useTheme' from '@mui/material/styles'
import { useTheme } from '@mui/material/styles';
// Import specific components from '@mui/material'
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
// Import 'MuiBreadcrumbs' from '@mui/material/Breadcrumbs'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project imports
// Import 'config' from 'config'
import config from 'config';
// Import 'gridSpacing' from 'store/constant'
import { gridSpacing } from 'store/constant';

// assets
// Import specific icons from respective packages
import { IconTallymark1 } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

// Style for link elements
const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center'
};

// ==============================|| BREADCRUMBS ||============================== //

// Definition of Breadcrumbs component with props
const Breadcrumbs = ({ card, divider, icon, icons, maxItems, navigation, rightAlign, separator, title, titleBottom, ...others }) => {
  // Access theme using useTheme hook
  const theme = useTheme();

  // Icon style object
  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  // State variables for main and active item
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // Function to set active item based on current path
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (document.location.pathname === config.basename + collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // useEffect hook to handle navigation items
  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  // Define SeparatorIcon component
  const SeparatorIcon = separator;
};const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="1rem" /> : <IconTallymark1 stroke={1.5} size="1rem">;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography component={Link} to="#" variant="subtitle1" sx={linkSX}>
        {icons && <CollapseIcon style={iconStyle} />}
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          textDecoration: 'none',
          alignContent: 'center',
          alignItems: 'center',
          color: 'grey.500'
        }}
      >
        {icons && <ItemIcon style={iconStyle} />}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(gridSpacing),
            border: card === false ? 'none' : '1px solid',
            borderColor: theme.palette.primary[200] + 75,
            background: card === false ? 'transparent' : theme.palette.background.default
          }}
          {...others}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}Return only the translated content, not including the original text.