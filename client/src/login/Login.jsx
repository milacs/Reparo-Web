import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../auth/AuthService';
import Footer from '../footer/Footer';
import Toolbar from '../toolbar/Toolbar';

export const Login = () => {
  const auth = React.useContext(AuthContext);

  return auth.isLoggedIn() ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <div
        id="login"
        className="flex flex-col justify-start content-center flex-wrap rounded-md border w-96 bg-white px-16 py-12 h-fit mt-40"
      >
        <h1 className="text-center text-xl pb-2 mb-4">Fazer login</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            auth.setUserData(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </div>
    </>
  );
};
