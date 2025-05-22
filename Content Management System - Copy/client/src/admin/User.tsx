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
} from '@mui/material';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users-with-posts');
      const sortedUsers = res.data.data.sort((a: User, b: User) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUsersPage;
