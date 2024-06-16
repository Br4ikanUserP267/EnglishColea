import React, { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type NavBarProps = {
  // Define props here if needed
};

const NavBar: React.FC<NavBarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.background.default,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component="a" href="/" sx={{ width: '100%', mb: 1 }}>
          <ListItemText primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }} primary="About Us" />
        </ListItem>
        <ListItem button component="a" href="/contact" sx={{ width: '100%', mb: 1 }}>
          <ListItemText primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }} primary="Contact" />
        </ListItem>
        <ListItem button component="a" href="/signup" sx={{ width: '100%', mb: 1 }}>
          <ListItemText primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }} primary="Sign Up" />
        </ListItem>
        <ListItem button component="a" href="/login" sx={{ width: '100%' }}>
          <ListItemText primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }} primary="Login" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#1976d2', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.5rem'}}>
            English Courses {/* Title or brand of your application */}
          </Typography>
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: '1rem' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <List component="nav" aria-labelledby="main navigation" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <ListItem button component="a" href="/" sx={{ ml: '10rem', flexGrow: 1 }}>
                <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} primary="About Us" />
              </ListItem>
              <ListItem button component="a" href="/contact" sx={{ mx: '1rem', flexGrow: 1 }}>
                <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} primary="Contact" />
              </ListItem>
              <ListItem button component="a" href="/signup" sx={{ mx: '1rem', flexGrow: 1 }}>
                <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} primary="Sign Up" />
              </ListItem>
              <ListItem button component="a" href="/login" sx={{ mx: '1rem', flexGrow: 1 }}>
                <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} primary="Login" />
              </ListItem>
            </List>
          )}
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
