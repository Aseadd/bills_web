// import React, { useState } from 'react';
// import { Button, Paper, TextField, Typography, Grid } from '@mui/material';
// import axios from 'axios';
// import { Cookie } from '@mui/icons-material';
// import Cookies from 'js-cookie';


// const CreateBill = () => {
// const [userId, setUserId] = useState(0);
//   const [billData, setBillData] = useState({
//     bill_name: '',
//     bill_amount: 0,
//     bill_date: new Date(),
//     status: "pending",
//     biller_name: '',
//     user: 1,
//   });

 

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setBillData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
    
//         const userLogged = Cookies.get('email');
//         const loggedId = Cookies.get('id');
//         if(userLogged){
//             const response = await axios.get(`http://localhost:8000/users/`);
//             console.log(response.data);
//            response.data.forEach((user: any) => {
//                 setBillData((prevData) => ({
//                     ...prevData,
//                     user: user.id,
//                 }));
//             }
//             );
//         }
        
//         console.log(billData);
//       await axios.post('http://localhost:8000/bills/create/', billData);

//       // Optionally, you can handle success or redirect to a different page
//       console.log('Bill created successfully!');
//     } catch (error) {
//       console.error('Error creating bill:', error);
//     }
//   };

//   return (
//     <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
//       <Typography variant="h4" gutterBottom>
//         Create Bill
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Bill Name"
//               name="bill_name"
//               fullWidth
//               value={billData.bill_name}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Amount"
//               name="bill_amount"
//               fullWidth
//               type="number"
//               value={billData.bill_amount}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Date"
//               name="bill_date"
//               fullWidth
//               type="date"
//               value={billData.bill_date}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Status"
//               name="status"
//               fullWidth
//               value={billData.status}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Biller Name"
//               name="biller_name"
//               fullWidth
//               value={billData.biller_name}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Create Bill
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default CreateBill;

import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateBill = () => {
    const navigate = useNavigate();
  const [billData, setBillData] = useState({
    bill_name: '',
    bill_amount: 0,
    bill_date: new Date().toISOString().split('T')[0], // Format the date as 'YYYY-MM-DD'
    status: 'pending',
    biller_name: '',
    // user: null, // Use null initially
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
  }, []); // Run once when the component mounts

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
     const response =  await axios.post('http://localhost:8000/bills/create/', billData);

      // Optionally, you can handle success or redirect to a different page
      
      console.log('Bill created successfully!');
      if(response.status === 200){
        setSuccess(true);
        setMsg('Bill created successfully!');
      }
      navigate('/bills');
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom>
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Status"
              name="status"
              fullWidth
              value={billData.status}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Biller Name"
              name="biller_name"
              fullWidth
              value={billData.biller_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Bill
            </Button>
            {success && <Typography variant="h6">{msg}</Typography>}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateBill;
