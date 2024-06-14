import React, { useState, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isDesktop = useMediaQuery('(min-width:600px)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
        },
      }),
    [prefersDarkMode]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignUp) {
      console.log({
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
      });
    } else {
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: 'calc(100vh - 64px)', justifyContent: 'center', alignItems: 'center' }}>
        {/* Adjusted height to account for the height of the navbar (64px) */}
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            width: '100%',
            maxWidth: '1200px',
            mt: 4, // Adjusted top margin to bring it closer to the navbar
            ...(isDesktop && {
              width: '80%',
            }),
            ...(isDesktop && prefersDarkMode && {
              width: '100vh',
            }),
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {isSignUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                {!isSignUp && (
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                )}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={toggleSignUp}>
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
