import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { AddTransaction } from './pages/AddTransaction';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Switch, Button, Stack, Box } from '@mui/material';
import { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '12px',
            padding: '6px 16px',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: darkMode ? '#1976d2' : '#1565c0',
              color: '#fff',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary" elevation={4}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              Finance Tracker
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <LightModeIcon fontSize="small" />
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                inputProps={{ 'aria-label': 'toggle dark mode' }}
              />
              <DarkModeIcon fontSize="small" />

              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/add">
                Add
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/add/:id" element={<AddTransaction />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};
