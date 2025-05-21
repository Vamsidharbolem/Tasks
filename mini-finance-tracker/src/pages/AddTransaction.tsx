import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../redux/transactionSlice';
import { RootState } from '../redux/store';
import { v4 as uuidv4 } from 'uuid';

type TransactionType = 'Income' | 'Expense';

interface FormValues {
  title: string;
  amount: string;
  type: TransactionType;
  date: string;
}

export const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const editingTxn = transactions.find((txn) => txn.id === id);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      amount: '',
      type: 'Income',
      date: new Date().toISOString().split('T')[0],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      amount: Yup.number().typeError('Must be a number').required('Required'),
      type: Yup.string().oneOf(['Income', 'Expense']).required(),
      date: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const payload = {
        id: editingTxn ? editingTxn.id : uuidv4(),
        title: values.title,
        amount: +values.amount,
        type: values.type as TransactionType,
        date: values.date,
      };

      if (editingTxn) {
        dispatch(updateTransaction(payload));
      } else {
        dispatch(addTransaction(payload));
      }
      navigate('/');
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (editingTxn) {
      formik.setValues({
        title: editingTxn.title,
        amount: editingTxn.amount.toString(),
        type: editingTxn.type,
        date: editingTxn.date,
      });
    }
  }, [editingTxn]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 4,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#fff',
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
          sx={{
            fontWeight: 'bold',
            color: '#00e5ff',
          }}
        >
          {editingTxn ? 'Edit Transaction' : 'Add Transaction'}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              InputProps={{ sx: { color: '#fff' } }}
              InputLabelProps={{ sx: { color: '#aaa' } }}
            />
            <TextField
              label="Amount"
              name="amount"
              fullWidth
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{ sx: { color: '#fff' } }}
              InputLabelProps={{ sx: { color: '#aaa' } }}
            />
            <TextField
              select
              label="Type"
              name="type"
              fullWidth
              value={formik.values.type}
              onChange={formik.handleChange}
              InputProps={{ sx: { color: '#fff' } }}
              InputLabelProps={{ sx: { color: '#aaa' } }}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </TextField>
            <TextField
              type="date"
              label="Date"
              name="date"
              fullWidth
              InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
              InputProps={{ sx: { color: '#fff' } }}
              value={formik.values.date}
              onChange={formik.handleChange}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                background: '#00e5ff',
                color: '#fff',
                fontWeight: 'bold',
                py: 1.5,
                fontSize: '1rem',
                borderRadius: '30px',
                boxShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff88',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: '#00bcd4',
                  boxShadow: '0 0 14px #00bcd4, 0 0 28px #00bcd466',
                },
              }}
            >
              {editingTxn ? 'Update Transaction' : 'Add Transaction'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddTransaction;
