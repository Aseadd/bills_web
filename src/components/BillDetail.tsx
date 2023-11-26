// BillDetail.jsx
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const BillDetail = ({ bill }: any) => {
  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom>
        Bill Detail
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{bill.bill_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Amount:</strong> ${bill.bill_amount}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Date:</strong> {bill.bill_date}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Status:</strong> {bill.status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Biller:</strong> {bill.biller_name}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BillDetail;
