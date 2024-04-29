import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Toolbar from '../toolbar/Toolbar';
import Footer from '../footer/Footer';
import { AuthContext } from '../auth/AuthService';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const auth = React.useContext(AuthContext);

  return auth.isLoggedIn() ? (
    <>
      <Sidebar />
      <div id="right-wrapper">
        <Toolbar />
        <div id="content-wrapper"></div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
