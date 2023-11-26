import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Typography, TextField, Button, Container, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post('http://localhost:8000/token/', user);

      Cookies.set('access_token', data.access);
      Cookies.set('refresh_token', data.refresh);
      Cookies.set('email', email);
      Cookies.set("id", "1");
      storeTokenLocally(data.access);
      navigate('/bills');
    } catch (error: any) {
      console.error('Error in token fetch:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Sign In</Typography>
        <Box component="form" onSubmit={submit} sx={{ width: '100%', mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
      <Typography variant="body1" sx={{ mt: 3 }}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
    </Container>
  );
};

export default Login;


const storeTokenLocally = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};