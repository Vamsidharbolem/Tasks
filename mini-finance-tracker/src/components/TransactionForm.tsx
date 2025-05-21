// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTransaction } from '../redux/transactionSlice';
// import { Button, MenuItem, Stack, TextField } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs, { Dayjs } from 'dayjs';
// import { v4 as uuidv4 } from 'uuid';

// export const TransactionForm = () => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState<number>(0);
//   const [type, setType] = useState<'Income' | 'Expense'>('Income');
//   const [date, setDate] = useState<Dayjs | null>(dayjs());

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !amount || !date) return;

//     dispatch(addTransaction({
//       id: uuidv4(),
//       title,
//       amount: type === 'Expense' ? -Math.abs(amount) : Math.abs(amount),
//       type,
//       date: date.toISOString(),
//     }));

//     setTitle('');
//     setAmount(0);
//     setType('Income');
//     setDate(dayjs());
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack spacing={2} mt={2}>
//         <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} required />
//         <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value as 'Income' | 'Expense')}>
//           <MenuItem value="Income">Income</MenuItem>
//           <MenuItem value="Expense">Expense</MenuItem>
//         </TextField>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker label="Date" value={date} onChange={(newValue) => setDate(newValue)} />
//         </LocalizationProvider>
//         <Button type="submit" variant="contained">Add Transaction</Button>
//       </Stack>
//     </form>
//   );
// };

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../redux/transactionSlice';
import { RootState } from '../redux/store';

export const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const editingTxn = transactions.find(txn => txn.id === id);

  const formik = useFormik({
    initialValues: {
      title: '',
      amount: '',
      type: 'Income',
      date: new Date().toISOString().split('T')[0],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      amount: Yup.number().typeError('Must be a number').required('Required'),
      type: Yup.string().oneOf(['Income', 'Expense']).required('Required'),
      date: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        amount: +values.amount,
        type: values.type as 'Income' | 'Expense',
        date: values.date,
      };

      if (editingTxn) {
        dispatch(updateTransaction({ ...editingTxn, ...payload }));
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
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" mb={2}>
        {editingTxn ? 'Edit Transaction' : 'Add Transaction'}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label="Amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <TextField
          select
          label="Type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </TextField>
        <TextField
          type="date"
          label="Date"
          name="date"
          InputLabelProps={{ shrink: true }}
          value={formik.values.date}
          onChange={formik.handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingTxn ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

