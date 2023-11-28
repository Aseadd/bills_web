import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Bill {
  id: number;
  bill_name: string;
  bill_amount: number;
  bill_date: string;
  status: string;
  biller_name: string;
}
interface Payment {
  id: number;
  amount: number;
  bill: Bill;
  price: number;
}

interface PaymentResponse {
  id: number;
  amount: number;
  bill: number;
  price: number;
}


const Payments: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Bill | null>(null);
  const [paidBills, setPaidProducts] = useState<Bill[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const showToast = (type: any, message: any) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type === 'warning') {
      toast.warning(message);
    } else {
      toast.info(message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
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

    fetchProducts();
  }, []);

  const handlePayment = (bill: Bill) => {
    setSelectedProduct(bill);
    setPaidProducts((prevProducts) => [...prevProducts, bill]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setPaymentAmount(0);
  };

  const handleConfirmPayment = async () => {
    try {
      const token = retrieveTokenLocally();

      const response = await axios.post(
        'http://localhost:8000/api/create-payment/',
        {
          amount: paymentAmount,
          bill: selectedProduct?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('response', response);
      if (response.status === 200) {
        setPaidProducts((prevProducts) => [...prevProducts, response.data]);

        console.log('paidBills', selectedProduct);
        setMsg('Payment successful!');
        setSuccess(true);
        showToast('success', 'Payment successful!');
        handleCloseDialog();

      } else {
        setMsg('Error making payment. Please try again.');
        setSuccess(false);
        showToast('error', 'Error making payment. Please try again.');
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Error making payment:', error);
      setMsg('Error making payment. Please try again.');
      setSuccess(false);
      showToast('error', 'Error making payment. Please try again.');
      handleCloseDialog();
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
    <Typography variant="h4" gutterBottom style={{ color: '#1b5e20' }}>
      Your Payments
    </Typography>
    {loading ? (
      <CircularProgress />
    ) : (
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bill Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Biller Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.bill_name}</TableCell>
                  <TableCell>Birr-{bill.bill_amount}</TableCell>
                  <TableCell>{bill.bill_date}</TableCell>
                  <TableCell>{bill.status}</TableCell>
                  <TableCell>{bill.biller_name}</TableCell>
                  <TableCell>
                    {bill.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePayment(bill)}
                      >
                        Pay
                      </Button>
                    )}
                    {bill.status === 'paid' && (
                      <Button variant="contained" color="primary" disabled>
                        Paid
                      </Button>
                    )}
                    {bill.status === 'overdue' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePayment(bill)}
                      >
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogContent>
              <TextField
                label="Amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleConfirmPayment} color="primary">
                Confirm Payment
              </Button>
            </DialogActions>
          </Dialog>
          {paidBills && (
            <div>
              <Typography variant="h6">Paid Bills</Typography>
              <List>

                {paidBills && paidBills.map((bill) => (
                  <ListItem key={bill.id}>
                    <ListItemText
                      primary={<strong>{bill.bill_name}</strong>}
                      secondary={`${bill.bill_date} - Birr-${bill.bill_amount}  - ${bill.biller_name}`}
                    />
                  </ListItem>
                ))
                }
              </List>
              </div>
            )}
                {
                   paidBills.length === 0 && (
                    <ListItem>
                      <ListItemText
                        primary={<strong>No paid bills yet.</strong>}
                      />
                    </ListItem>
                  )
                }
            </div>
    )}
    
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
  </Paper>
  );
};

export default Payments;


const retrieveTokenLocally = () => {
  const token = Cookies.get('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
}
