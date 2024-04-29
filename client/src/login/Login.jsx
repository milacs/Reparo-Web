import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../auth/AuthService';

export const Login = () => {
  const auth = React.useContext(AuthContext);

  // React.useEffect(() => {
  //   if (auth.isLoggedIn()) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${
  //           auth.getUserData().credential
  //         }`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${auth.getUserData().credential}`,
  //             Accept: 'application/json',
  //           },
  //         },
  //       )
  //       .then((response) => {
  //         auth.setProfileData(response.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [auth.getUserData()]);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => auth.setUserData(codeResponse),
  //   onError: (error) => alert('Login Failed:', error),
  // });

  return (
    <div id="login">
      <h2>Reparo Web</h2>
      <br />
      <br />
      {auth.isLoggedIn() ? (
        <Navigate to="/dashboard" />
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            auth.setUserData(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      )}
    </div>
  );
};
