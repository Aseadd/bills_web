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
import BillDetail from './BillDetail';

interface Bill {
  id: number;
  bill_name: string;
  bill_amount: number;
  bill_date: string;
  status: string;
  biller_name: string;
}

const Bills: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = retrieveTokenLocally();

        const response = await axios.get('http://localhost:8000/bills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        const response = await axios.delete(`http://localhost:8000/bills/${deleteId}`);
        console.log(response);
        setBills((prevBills) => prevBills.filter((bill) => bill.id !== deleteId));
      } catch (error) {
        console.error('Error deleting bill:', error);
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleDetails = async (bill: any) => {
    setSelectedBill(bills.find((b) => b.id === bill) || null);
  };

  const handleCreateBill = async () => {
    // Implement your logic for creating a new bill
    // You may navigate to the create bill page or show a dialog
  };

  const upcomingBills = bills.filter((bill) => {
    const currentDate: Date = new Date();
    const billDate: Date = new Date(bill.bill_date);
    const millisecondsInADay: number = 1000 * 60 * 60 * 24;

    const daysUntilDue: number = Math.floor((billDate.getTime() - currentDate.getTime()) / millisecondsInADay);

    return daysUntilDue > 0 && daysUntilDue <= 30;
  });

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom style={{ color: '#1b5e20' }}>
        Your Bills
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bill Name</TableCell>
                  <TableCell>Bill Amount</TableCell>
                  <TableCell>Bill Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Biller Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.bill_name}</TableCell>
                    <TableCell>{`Birr-${bill.bill_amount}`}</TableCell>
                    <TableCell>{bill.bill_date}</TableCell>
                    <TableCell>{bill.status}</TableCell>
                    <TableCell>{bill.biller_name}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDetails(bill.id)}>Details</Button>
                      <Button onClick={() => handleDelete(bill.id)} color='error'>Delete</Button>
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
                Are you sure you want to delete this bill?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {selectedBill && <BillDetail bill = {selectedBill} />}
        </>
      )}
    </Paper>

);
};

export default Bills;

const retrieveTokenLocally = () => {
const token = Cookies.get('access_token');
if (!token) {
  throw new Error('No token found');
}
return token;
};
