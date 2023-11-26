import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import BillDetail from './BillDetail'; 
import CreateBill from './CreateBill';
import Reminder from './Reminder';

interface Bill {
  id: number;
  bill_name: string;
  bill_amount: number;
  bill_date: string;
  status: string;
  biller_name: string;
}

const Bills: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = retrieveTokenLocally();

        const response = await axios.get('http://localhost:8000/bills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []); 

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/bills/${id}`);
      setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  const handleDetails = async (bill: any) => {
   console.log('handleDetails', bill);
    // try {
    //   const response = await axios.get(`http://localhost:8000/bills/${id}`);
    //   setSelectedBill(response.data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error('Error fetching bill details:', error);
    // }
    setSelectedBill(bills.find((b) => b.id === bill) || null);
  };

  const handleCreateBill = async () => {
   
  }

  const upcomingBills = bills.filter((bill) => {
    const currentDate: Date = new Date();
    const billDate: Date = new Date(bill.bill_date);
    const millisecondsInADay: number = 1000 * 60 * 60 * 24;
    
    const daysUntilDue: number = Math.floor((billDate.getTime() - currentDate.getTime()) / millisecondsInADay);
    
    return daysUntilDue > 0 && daysUntilDue <= 30;
  });

  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
      <Typography variant="h4" gutterBottom>
        Your Bills
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
     
        <div>
            <Button variant="contained" color="primary" onClick={() => handleCreateBill}>
              Create Bill
            </Button>
          <List>
            {bills.map((bill) => (
              <ListItem key={bill.id}>
                <ListItemText
                  primary={<strong>{bill.bill_name}</strong>}
                  secondary={`$${bill.bill_amount} - ${bill.bill_date} - ${bill.status} - ${bill.id}`}
                />
                <Button onClick={() => handleDetails(bill.id)}>Details</Button>
                <Button onClick={() => handleDelete(bill.id)}>Delete</Button>
              </ListItem>
            ))}
          </List>
          {/* {selectedBill && (
            <div>
              <Typography variant="h6">Bill Details</Typography>
              <p>
                selectedBill.bill_name
              </p>
              <p>
                selectedBill.bill_amount
              </p>

            </div>
          )} */}
          {selectedBill && <BillDetail bill={selectedBill} />}
        </div>
      )}
    </Paper>
  );
};

export default Bills;

const retrieveTokenLocally = () => {
  const token = Cookies.get('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};
