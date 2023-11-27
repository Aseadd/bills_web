import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;

}

const Payments: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const token = retrieveTokenLocally();

        const response = await axios.get('http://localhost:8000/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchproducts();
  }, []); 
  return (
    <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
       <Typography variant="h4" gutterBottom style={{color: '#1b5e20'}}>
        Your Payments
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
     
        <div>
          <List>
            {products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={<strong>{product.name}</strong>}
                  secondary={`${product.description} - Birr&nbsp;${product.price}`}
                />
              </ListItem>
            ))}
          </List>
          {/* {selectedproduct && (
            <div>
              <Typography variant="h6">product Details</Typography>
              <p>
                selectedproduct.product_name
              </p>
              <p>
                selectedproduct.product_amount
              </p>

            </div>
          )} */}
        </div>
      )}
    </Paper>
  );
};

export default Payments;

const retrieveTokenLocally = () => {
  const token = Cookies.get('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};
