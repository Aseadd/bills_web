import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from "./app/store";
import { BrowserRouter, Route, Router, Routes, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import LoginPage from './components/Login';
import Login from './components/Login';
import Bills from './components/Bills';
import Logout from './components/Logout';
import CreateBill from './components/CreateBill';
import Reminder from './components/Reminder';

import Cookies from 'js-cookie';

const isAuthenticated = () => {
  return !!Cookies.get('access_token');
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
     
        {isAuthenticated() ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/bills"
            element={isAuthenticated() ? <Bills /> : <Navigate to="/login" />}
          />
          <Route
            path="/logout"
            element={isAuthenticated() ? <Logout /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-bill"
            element={isAuthenticated() ? <CreateBill /> : <Navigate to="/login" />}
          />
          <Route
            path="/reminder"
            element={isAuthenticated() ? <Reminder /> : <Navigate to="/login" />}
          />
         
        </Routes> 
      </BrowserRouter>
    </Provider>
  );
};

export default App;
