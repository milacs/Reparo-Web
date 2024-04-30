import React from 'react';
import { AuthContext } from '../auth/AuthService';
import { Navigate } from 'react-router-dom';
import { UploadDroppable } from '../ui-components/UploadDroppable';

export const Dashboard = () => {
  const auth = React.useContext(AuthContext);

  React.useEffect(() => {}, [auth.getUserData()]);

  return auth.isLoggedIn() ? (
    <>
      <UploadDroppable />
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
