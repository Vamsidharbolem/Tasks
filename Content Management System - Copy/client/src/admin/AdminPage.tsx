import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" color="secondary" sx={{background:"black"}}> {/* Changed color to secondary */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" color="inherit"> {/* Text color changed to inherit */}
            Admin Panel
          </Typography>
          <Box>
            <Button 
              color="inherit" 
              onClick={() => handleNavigation('/admin/users')} 
              sx={{ marginRight: 2 }} // Added spacing between buttons
            >
              Users
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleNavigation('/admin/posts')} 
              sx={{ marginRight: 2 }} // Added spacing between buttons
            >
              Posts
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleNavigation('/admin/categories')} 
              sx={{ marginRight: 2 }} // Added spacing between buttons
            >
              Categories
            </Button>
            <Button 
              color="inherit" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box mt={6} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin Page
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AdminPage;
