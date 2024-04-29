import React from 'react';
import './toolbar.scss';
import Logout from '../assets/logout.svg';
import { ImgButton } from '../components/ImgButton';
import { AuthContext } from '../auth/AuthService';
import { googleLogout } from '@react-oauth/google';
import { redirect } from 'react-router-dom';

const Toolbar = () => {
  const auth = React.useContext(AuthContext);

  const logout = () => {
    googleLogout();
    auth.clearUserData();
    redirect('/login');
  };

  return (
    <div id="toolbar">
      <ImgButton src={Logout} alt="Logout" onClick={logout} />
    </div>
  );
};

export default Toolbar;
