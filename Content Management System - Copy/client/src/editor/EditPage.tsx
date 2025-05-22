import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Card,
  Box,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching post", err);
        showSnackbar("Failed to load post", "error");
      }
    };
    fetchPost();
  }, [id]);

  const showSnackbar = (msg: string, severity: "success" | "error") => {
    setSnackbarMsg(msg);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar("Post updated successfully", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      console.error("Error updating post", err);
      showSnackbar(err?.response?.data?.message || "Update failed", "error");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSnackbar("Post deleted successfully", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      console.error("Error deleting post", err);
      showSnackbar(err?.response?.data?.message || "Delete failed", "error");
    }
  };

  return (
    <>
      <Card sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" color="primary">
          Edit Post
        </Typography>

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          sx={{
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={6}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
            },
            '& .MuiInputLabel-root': {
              color: '#607d8b',
            },
          }}
        />

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              px: 4,
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{
              px: 4,
              borderColor: '#f44336',
              '&:hover': {
                borderColor: '#d32f2f',
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditPage;
