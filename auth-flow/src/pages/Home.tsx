import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Container>
      <Typography variant="h2">Welcome to the Home Page</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Home;