import React, { useEffect, useState } from 'react';
import {
  TextField,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string;
  name: string;
}

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/categories')
      .then((response) => {
        const fetchedCategories: Category[] = response?.data?.data || [];
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add a post.');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/posts/create',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.status) {
          setOpenSnackbar(true);
          formik.resetForm();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          alert(response.data.message);
        }
      } catch (error: any) {
        alert(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={10} sx={{ p: 4, borderRadius: 4, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Create a New Post
            </Typography>

            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#607d8b',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Content"
                variant="outlined"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                multiline
                rows={5}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#607d8b',
                  },
                }}
              />

              <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Category"
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  sx={{
                    backgroundColor: '#ffffff',
                    '& .MuiInputLabel-root': {
                      color: '#607d8b',
                    },
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {formik.errors.category}
                  </Typography>
                )}
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  endIcon={loading && <CircularProgress size={20} color="inherit" />}
                  sx={{
                    backgroundColor: '#3f51b5',
                    '&:hover': {
                      backgroundColor: '#283593',
                    },
                  }}
                >
                  {loading ? 'Posting...' : 'Add Post'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Post added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPost;
