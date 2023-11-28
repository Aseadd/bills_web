
import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, TextField, Typography, Grid, FormControl, InputLabel, Select, FormControlLabel, Radio, RadioGroup, FormHelperText } from '@mui/material';
import axios from 'axios';
import { Label } from '@mui/icons-material';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: '',
  });
//   const toast: React.MutableRefObject<any> = useRef(null);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const USER_TYPE_CHOICES: any = [
    ['C', 'Customer'],
    ['B', 'Business'],
    ['A', 'Admin'],
  ];

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    user_type: '',
  });



  const handleChange = (e: any) => {
    const { name, value } = e.target;

    let error = '';
    if (name === 'name' && value.trim() === '' ) {
      error = 'Name is required.';
    } else if (name === 'name' && value.length < 3) {
        error = 'Name must be at least 2 characters.';
    }else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Invalid email address.';
    } else if (name === 'password' && value.length < 4) {
      error = 'Password must be at least 4 characters.';
    }
    else if (name === 'user_type' && value.trim() === '') {
        error = 'User Type is required.';
     }

  
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));


    setUserData((prevData) => ({
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

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (Object.values(validationErrors).some((error) => error !== '')) {
      
        setMsg('Please fix all validation errors.');
        setSuccess(false);
        showToast('error', 'Please fix all validation errors.');
        return;
      }

    try {
      const response = await axios.post('http://localhost:8000/register/', userData);

     console.log('response', response);
     if (response.status === 200) {
        setMsg('User created successfully!');
        setSuccess(true);
        showToast('success', 'User created successfully!');
        setUserData({
            name: '',
            email: '',
            password: '',
            user_type: '',
          });
          
        // navigate('/users');
      } 
      else if (response.status === 400) {
        setMsg('Error creating user. Please try again.');
        setSuccess(false);
        showToast('error', response.data['email'][0]);
      }
      else {
        console.log('response', response);
        setMsg('Error creating user. Please try again.');
        setSuccess(false);
        showToast('error', 'Error creating user. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setMsg('Error creating user. Please try again.');
      setSuccess(false);
      showToast('error', 'Error creating user. Please try again.');
    }
  };
  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom>
        Register User
      </Typography>
      <form onSubmit={handleSignup}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={userData.name}
              onChange={handleChange}
              error={Boolean(validationErrors.name)}
              helperText={validationErrors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={userData.email}
              onChange={handleChange}
              error={Boolean(validationErrors.email)}
              helperText={validationErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={userData.password}
              onChange={handleChange}
              error={Boolean(validationErrors.password)}
              helperText={validationErrors.password}
            />
          </Grid>
          <Grid item xs={12} >
          <InputLabel id="user_type">User Type</InputLabel>
          <FormControl component="fieldset">
            <RadioGroup
                row
                aria-label="user_type"
                name="user_type"
                value={userData.user_type}
                onChange={handleChange}
                
            >
             <FormControlLabel value="C" control={<Radio />} label="Customer" />
            <FormControlLabel value="B" control={<Radio />} label="Biller" />
            </RadioGroup>
            <FormHelperText>{validationErrors.user_type}</FormHelperText>
            </FormControl>
          </Grid> 
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    
      </form>
    </Paper>
  );
};

export default CreateUser;
