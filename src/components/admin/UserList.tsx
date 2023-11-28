import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: number;
  user_type: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = retrieveTokenLocally();

        const response = await axios.get('http://localhost:8000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('response', response);

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        const response = await axios.delete(`http://localhost:8000/users/${deleteId}`);
        console.log(response);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteId));
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom style={{ color: '#1b5e20' }}>
        Your Users
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>User Type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <strong>{user.name}</strong>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.user_type === 'C'
                        ? 'Customer'
                        : user.user_type === 'B'
                        ? 'Biller'
                        : 'Admin'}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(user.id)} color='error'>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Paper>
  );
};

export default Users;

const retrieveTokenLocally = () => {
  const token = Cookies.get('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};
