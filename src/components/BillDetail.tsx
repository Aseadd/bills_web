// BillDetail.tsx
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

interface BillDetailProps {
  bill: {
    bill_name: string;
    bill_amount: number;
    bill_date: string;
    status: string;
    biller_name: string;
  };
}

const BillDetail: React.FC<BillDetailProps> = ({ bill }) => {
  const { bill_name, bill_amount, bill_date, status, biller_name } = bill;

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom>
        Bill Detail
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{bill_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Amount:</strong> ${bill_amount}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Date:</strong> {bill_date}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Status:</strong> {status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Biller:</strong> {biller_name}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BillDetail;
