
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Paper, TextField, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const CreateBill = () => {
    const navigate = useNavigate();
  const [billData, setBillData] = useState({
    bill_name: '',
    bill_amount: 0,
    bill_date: new Date().toISOString().split('T')[0],
    status: 'pending',
    biller_name: localStorage.getItem('user_name'),

  });

  const [validationErrors, setValidationErrors] = useState({
    bill_name: '',
    bill_amount: '',
    bill_date: '',
    status: '',
  });


  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log('billData:', billData);
    }, [billData]);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userLogged = Cookies.get('email');
        const response = await axios.get('http://localhost:8000/users/');
        
        const matchingUser = response.data.find((user: any) => user.email === userLogged);

        if (matchingUser) {
        //   setBillData((prevData) => ({
        //     ...prevData,
        //     user: matchingUser.id,
        //   }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); 

  const handleChange = (e: any) => {
    const { name, value } = e.target;


    let error = '';
    if (name === 'bill_name' && value.length < 3) {
      error = 'Bill name must be at least 3 characters long.';
    } else if (name === 'bill_amount' && value < 0) {
      error = 'Bill amount must be a positive number.';
    } else if (name === 'bill_date' && value === '') {
      error = 'Bill date is required.';
    } else if (name === 'status' && value === '') {
      error = 'Status is required.';
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setBillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const showToast = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message, { position: 'top-right', autoClose: 5000 });
    } else if (type === 'error') {
      toast.error(message, { position: 'top-right', autoClose: 5000 });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (Object.values(validationErrors).some((error) => error !== '')) {
      
      setMsg('Please fix all validation errors.');
      setSuccess(false);
      showToast('error', 'Please fix all validation errors.');
      return;
    }

    try {
     const response =  await axios.post('http://localhost:8000/bills/create/', billData);
     if (response.status === 200) {
      setMsg('User created successfully!');
      setSuccess(true);
      showToast('success', 'Bill created successfully!');
      // navigate('/users');
    } else {
      setMsg('Error creating Bill. Please try again.');
      setSuccess(false);
      showToast('error', 'Error creating user. Please try again.');
    }
  } catch (error) {
    setMsg('Error creating Bill. Please try again.');
    setSuccess(false);
    showToast('error', 'Error creating Bill. Please try again.');
  }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
       <Typography variant="h4" gutterBottom style={{color: '#1b5e20'}}>
        Create Bill
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
              label="Bill Name"
              name="bill_name"
              fullWidth
              value={billData.bill_name}
              onChange={handleChange}
              error={Boolean(validationErrors.bill_name)}
              helperText={validationErrors.bill_name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Amount"
              name="bill_amount"
              fullWidth
              type="number"
              value={billData.bill_amount}
              onChange={handleChange}
              error={Boolean(validationErrors.bill_amount)}
              helperText={validationErrors.bill_amount}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="bill_date"
              fullWidth
              type="date"
              value={billData.bill_date}
              onChange={handleChange}
             error= {Boolean(validationErrors.bill_date)}
              helperText={validationErrors.bill_date}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={billData.status}
                onChange={handleChange}
              >
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Bill
            </Button>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateBill;
