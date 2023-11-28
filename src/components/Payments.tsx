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
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Payment {
  id: number;
  amount: number;
  product: Product;
  price: number;
}

interface PaymentResponse {
  id: number;
  amount: number;
  product: number;
  price: number;
}


const Payments: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paidProducts, setPaidProducts] = useState<Product[]>([]);
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

        const response = await axios.get('http://localhost:8000/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePayment = (product: Product) => {
    setSelectedProduct(product);
    setPaidProducts((prevProducts) => [...prevProducts, product]);
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
          product: selectedProduct?.id,
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
        console.log('paidProducts', selectedProduct);
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
          <List>
            {products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={<strong>{product.name}</strong>}
                  secondary={`${product.description} - Birr-${product.price}`}
                />
                <Button variant="contained" color="primary" onClick={() => handlePayment(product)}>
                  Pay
                </Button>
              </ListItem>
            ))}
          </List>
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
          {paidProducts && (
            <div>
              <Typography variant="h6">Paid Prodcuts</Typography>
              <List>

                {paidProducts && paidProducts.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText
                      primary={<strong>{product.name}</strong>}
                      secondary={`${product.description} - Birr-${product.price}`}
                    />
                  </ListItem>
                ))
                }
                {
                   paidProducts.length === 0 && (
                    <ListItem>
                      <ListItemText
                        primary={<strong>No paid products yet.</strong>}
                      />
                    </ListItem>
                  )
                }
              </List>
            </div>
          )}
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
