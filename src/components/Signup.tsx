// import React, { useState } from 'react';
// import { TextField, Button, Typography, Container, Paper } from '@mui/material';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');

//   const handleInputChange = (e:any) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignup = async (e: any) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8000/api/signup/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setMessage('User created successfully!');
//       } else {
//         const data = await response.json();
//         setMessage(data.detail || 'Signup failed');
//       }
//     } catch (error) {
//       console.error('Error during signup:', error);
//       setMessage('An error occurred during signup');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography variant="h5">Signup</Typography>
//         <form onSubmit={handleSignup} style={{ width: '100%', marginTop: 16 }}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="password"
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
//             Signup
//           </Button>
//         </form>
//         <Typography variant="body2" style={{ marginTop: 16, color: message.includes('successfully') ? 'green' : 'red' }}>
//           {message}
//         </Typography>
//       </Paper>

//       <Typography variant="body2" style={{ marginTop: 16, textAlign: 'center' }}>
//         Already have an account? <a href="/login">Login</a>
//      </Typography>
//     </Container>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { Button, Paper, TextField, Typography, Grid } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
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
  );
};

export default Signup;
