import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface Bill {
  id: number;
  bill_name: string;
  bill_amount: number;
  bill_date: string;
  status: string;
  biller_name: string;
}

const Reminder = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  const overdueBills = bills.filter((bill) => {
    const currentDate: Date = new Date();
    const billDate: Date = new Date(bill.bill_date);

    return currentDate > billDate;
  });

  const upcomingBills = bills.filter((bill) => {
    const currentDate: Date = new Date();
    const billDate: Date = new Date(bill.bill_date);
    const millisecondsInADay: number = 1000 * 60 * 60 * 24;

    const daysUntilDue: number = Math.floor((billDate.getTime() - currentDate.getTime()) / millisecondsInADay);

    return daysUntilDue > 0 && daysUntilDue <= 2;
  });

  return (
    <Card variant="outlined" style={{ marginTop: 20, borderRadius: 10 }}>
      <CardContent>
      {overdueBills.length > 0 && (
      <div>
      <Typography variant="h5" gutterBottom style={{color: '#1b5e20'}}>
        Overdue Bills Reminder
      </Typography>
            <List>
              {overdueBills.map((bill: any) => (
                <ListItem key={bill.id} style={{ marginBottom: 10 }}>
                  <Typography>
                    <strong>{bill.bill_name}</strong> - {bill.bill_date} -  <span>Birr </span>{bill.bill_amount}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        
        {upcomingBills.length > 0 && (
          <div style={{ marginBottom: 20 }}>
        <Typography variant="h5" gutterBottom style={{color: '#1b5e20'}}>
        Upcoming Bills Reminder
      </Typography>
            <List>
              {upcomingBills.map((bill: any) => (
                <ListItem key={bill.id} style={{ marginBottom: 10 }}>
                  <Typography>
                    <strong>{bill.bill_name}</strong> - {bill.bill_date} - <span>Birr </span>{bill.bill_amount}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        
      </CardContent>
    </Card>
  );
};

export default Reminder;

const retrieveTokenLocally = () => {
  const token = Cookies.get('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};
