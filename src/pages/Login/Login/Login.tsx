import React, { useState, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../credentials';
import { NavBar } from '@/components/NavBar';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState<string | null>(null); // State to handle email for password reset
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      if (isSignUp) {
        const confirmPassword = data.get('confirmPassword') as string;
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          return;
        }
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created:', credential.user);
        setSuccessMessage('User registered successfully!');
      } else {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', credential.user);
        setSuccessMessage('User signed in successfully!');
      }
      setError(null);
    } catch (error: any) {
      console.error('Authentication error:', error.message);
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    if (error.code === 'auth/invalid-email') {
      setError('Invalid email address');
    } else if (error.code === 'auth/user-not-found') {
      setError('User not found');
    } else if (error.code === 'auth/wrong-password') {
      setError('Wrong password');
    } else {
      setError('Authentication error');
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccessMessage(null);
  };

  const handlePasswordReset = async () => {
    if (resetEmail) {
      try {
        await sendPasswordResetEmail(auth, resetEmail);
        setSuccessMessage('Password reset email sent!');
        setError(null);
      } catch (error: any) {
        console.error('Password reset error:', error.message);
        if (error.code === 'auth/invalid-email') {
          setError('Invalid email address');
        } else if (error.code === 'auth/user-not-found') {
          setError('User not found');
        } else {
          setError('Error sending password reset email');
        }
      }
    } else {
      setError('Please enter your email address');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Grid container component="main" sx={{ position: 'absolute', top: '6em', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '2em',
            width: '100%',
            maxWidth: '80em',
            mt: '2em',
            ...(isDesktop && {
              width: '70%',
            }),
          }}
        >
          <Avatar sx={{ m: '0.5em', bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: '1em' }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          {successMessage && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: '1em' }}>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main, mr: '0.5em' }} />
              <Typography variant="body2" sx={{ color: theme.palette.success.main }}>
                {successMessage}
              </Typography>
            </Box>
          )}
          {error && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: '1em' }}>
              <ClearIcon sx={{ color: theme.palette.error.main, mr: '0.5em' }} />
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: '0.5em', width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setResetEmail(e.target.value)} // Update reset email state
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: '1.5em', mb: '1em' }}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                {!isSignUp && (
                  <Link href="#" variant="body2" onClick={handlePasswordReset}>
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
