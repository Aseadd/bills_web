
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

  const paperStyle = {
    padding: 16,
    margin: 16,
  };

  const headingStyle = {
    fontSize: '1.5rem',
    marginBottom: 16,
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const valueStyle = {
    color: '#1976D2', 
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Typography variant="h4" gutterBottom style={headingStyle}>
        Bill Detail
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{bill_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={labelStyle}>
            <strong>Amount:</strong>
          </Typography>
          <Typography style={valueStyle}>
            Birr{bill_amount}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={labelStyle}>
            <strong>Date:</strong>
          </Typography>
          <Typography style={valueStyle}>
            {bill_date}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={labelStyle}>
            <strong>Status:</strong>
          </Typography>
          <Typography style={valueStyle}>
            {status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={labelStyle}>
            <strong>Biller:</strong>
          </Typography>
          <Typography style={valueStyle}>
            {biller_name}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BillDetail;
