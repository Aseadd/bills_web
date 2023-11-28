import React, { useState } from 'react';
import { Button, Paper, TextField, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: 'C',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/register/', userData);

      // Optionally, you can handle success or redirect to a different page
      console.log('Signup successful!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom>
        Signup
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body2" style={{ marginTop: 16, textAlign: 'center' }}>
      Already have an account? <a href="/login">Login</a>
     </Typography>
    </Paper>
  </Container>
  );
};

export default Signup;
