import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      // Clear cookies
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      localStorage.removeItem('user_type');
      localStorage.removeItem('user_name');
      // navigate('/');
      window.location.href = '/';
      // window.location.href = window.location.href;
    };

    logout();
  }, [navigate]);

  return null; // or you can render a loading spinner or a message if needed
};

export default Logout;