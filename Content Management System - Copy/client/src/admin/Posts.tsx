import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

interface Author {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  author: Author;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
 

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/posts');
      const postsData = Array.isArray(res.data.posts) ? res.data.posts : [];
      setPosts(postsData);
    } catch (error: any) {
      console.error('Error fetching posts:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Post Details
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Content</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Author Name</b></TableCell>
                <TableCell><b>Author ID</b></TableCell>
                <TableCell><b>Created At</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.status}</TableCell>
                  <TableCell>{post.author?.name || 'Unknown'}</TableCell>
                  <TableCell>{post.author?._id || 'N/A'}</TableCell>
                  <TableCell>{dayjs(post.createdAt).format('DD MMM YYYY, HH:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Posts;
