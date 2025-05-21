import { Container, Typography, Box, Paper } from '@mui/material';
import { BalanceSummary } from '../components/BalanceSummary';
import { TransactionList } from '../components/TransactionList';

export const Home = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(120deg, #0f2027, #203a43, #2c5364)',
        minHeight: '100vh',
        py: 8,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 5,
              textAlign: 'center',
              letterSpacing: 1,
              color: '#00e5ff',
              textShadow: '0 0 10px #00e5ff66',
            }}
          >
            FinEase 💼
          </Typography>

          <BalanceSummary />

          <Box mt={6}>
            <TransactionList />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
