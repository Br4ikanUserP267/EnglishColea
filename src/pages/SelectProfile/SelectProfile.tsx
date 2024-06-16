// SelectProfile.tsx
import React, { useState } from 'react';
import { Container, Paper, Typography, Radio, RadioGroup, FormControl, FormControlLabel, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import { ArrowForward } from '@mui/icons-material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SelectProfile: React.FC = () => {
  const [profile, setProfile] = useState<string | null>(null);

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the profile selection logic here
    console.log('Selected profile:', profile);
  };

  return (
    <Container maxWidth="sm" sx={{
      mt: 5,
      animation: `${fadeIn} 1s ease-in-out`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centra horizontalmente
      justifyContent: 'center', // Centra verticalmente
      minHeight: '100vh', // Mínimo alto para ocupar toda la pantalla
      padding: '2em', // Añade espaciado interno
      margin: 'auto', // Centra el Container horizontalmente en desktop
    }}>
      <Paper elevation={3} sx={{
        p: 3,
        border: (theme) => theme.palette.mode === 'light' ? '1px solid #ccc' : 'none',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : 'inherit',
        width: '100%', // Ajusta el ancho al 100% del Container
        maxWidth: '600px', // Establece un ancho máximo para el Paper
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome for this adventure!
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Please select your profile type
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup aria-label="profile" name="profile" value={profile} onChange={handleProfileChange}>
              <FormControlLabel value="School" control={<Radio />} label="School" />
              <FormControlLabel value="Student" control={<Radio />} label="Student" />
            </RadioGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<ArrowForward />}
              sx={{ mt: 2, width: '100%' }} // Ajusta el ancho del botón al 100% del Container
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

export default SelectProfile;
