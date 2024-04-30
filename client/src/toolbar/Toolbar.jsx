import React from 'react';
import Logout from '../assets/images/logout.svg';
import Logo from '../assets/images/logo.svg';
import { ImgButton } from '../ui-components/ImgButton';
import { AuthContext } from '../auth/AuthService';
import { googleLogout } from '@react-oauth/google';
import { redirect } from 'react-router-dom';
import { UserInfo } from './UserInfo';

const Toolbar = () => {
  const auth = React.useContext(AuthContext);

  const logout = () => {
    googleLogout();
    auth.clearUserData();
    redirect('/login');
  };

  return (
    <div
      id="toolbar"
      className="
      container flex flex-row justify-between align-middle
      h-14 w-full max-w-none
      px-4 py-2
      bg-white shadow"
    >
      <div id="logo" className="flex flex-row justify-between">
        <img src={Logo} className="grow-0 w-12 me-2" />
        <span className="my-auto text-xl">Reparo Web</span>
      </div>
      {auth && auth.isLoggedIn() && (
        <div className="flex flex-row w-fit">
          <UserInfo src={auth.getUserPicture()} name={auth.getUserName()} />
          <ImgButton src={Logout} alt="Logout" onClick={logout} />
        </div>
      )}
    </div>
  );
};

export default Toolbar;
