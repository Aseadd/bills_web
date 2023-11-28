import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import LoginPage from './components/Login';
import Bills from './components/Bills';
import Logout from './components/Logout';
import CreateBill from './components/CreateBill';
import Reminder from './components/Reminder';
import Payments from './components/Payments';
import CreateUser from './components/admin/CreateUser';
import Users from './components/admin/UserList';
import Report from './components/Report';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
  return Cookies.get('access_token')? true : false;
};

const isAuthorized = () => {
  return localStorage.getItem('user');
};



const App: React.FC = () => {

  // refresh the window on logout only once
   
  

  return (
    <Provider store={store}>
      <BrowserRouter>
      
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <>
                  <Navbar />
                  <Outlet />
                </>
              ) : (
                <LoginPage />
              )
            }
          >
            <Route path="login" element={<LoginPage />} />
            <Route path="bills" element={<Bills />} />
            <Route path="logout" element={<Logout />} />
            <Route path="create-bill" element={<CreateBill />} />
            <Route path="reminder" element={<Reminder />} />
            <Route path="payment" element={<Payments />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="users" element={<Users />} />
            <Route path='report' element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
