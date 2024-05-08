Import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
Import { showError } from 'utils/common';
Import useLogin from 'hooks/useLogin';

// material-ui
Import { useTheme } from '@mui/material/styles';
Import { Grid, Stack, Typography, useMediaQuery, CircularProgress } from '@mui/material';

// project imports
Import AuthWrapper from '../AuthWrapper';
Import AuthCardWrapper from '../AuthCardWrapper';
Import Logo from 'ui-component/Logo';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const LarkOAuth = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [searchParams] = useSearchParams();
  const [prompt, setPrompt] = useState('Processing...');
  const { larkLogin } = useLogin();

  let navigate = useNavigate();

  const sendCode = async (code, state, count) => {
    const { success, message } = await larkLogin(code, state);
    if (!success) {
      if (message) {
        showError(message);
      }
      if (count === 0) {
        setPrompt(`Operation failed, redirecting to the login page...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/login');
        return;
      }
      count++;
      setPrompt(`Error occurred, retrying for the ${count} time...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await sendCode(code, state, count);
    }
  };

  useEffect(() => {
    let code = searchParams.get('code');
    let state = searchParams.get('state');
    sendCode(code, state, 0).then();
  }, []);

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end">
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 136px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">```
飞书 登录 translates to Lark Login
```