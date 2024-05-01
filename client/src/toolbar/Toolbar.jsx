import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { redirect } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';

import { AuthContext } from '../auth/AuthService';
import { UserInfo } from './UserInfo';
import { DropzoneWithPreview } from '../ui-components/DropzoneWithPreview';

import Logo from '../assets/images/logo.svg';

const Toolbar = () => {
  const auth = React.useContext(AuthContext);

  const logout = () => {
    googleLogout();
    auth.clearUserData();
    redirect('/login');
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

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
        <span className="my-auto font-normal text-xl">Reparo Web</span>
      </div>
      {auth && auth.isLoggedIn() && (
        <div className="flex flex-row w-fit gap-5">
          <Button
            onClick={handleOpen}
            variant="text"
            className="flex items-center gap-3 font-normal text-grey-900 material-button"
          >
            <span className="material-symbols-outlined">cloud_upload</span>
            <span>Upload imagem</span>
          </Button>
          <Dialog open={open} handler={handleOpen} size="xl">
            <DialogHeader className="flex flex-row justify-between content-center">
              Upload imagem
              <IconButton
                variant="text"
                className="rounded-full flex material-icon-button"
                onClick={handleOpen}
              >
                <span className="material-symbols-outlined">close</span>
              </IconButton>
            </DialogHeader>
            <DialogBody>
              <DropzoneWithPreview />
            </DialogBody>
          </Dialog>
          <UserInfo src={auth.getUserPicture()} name={auth.getUserName()} />
          <IconButton
            variant="text"
            className="rounded-full flex material-icon-button"
            onClick={logout}
          >
            <span className="material-symbols-outlined">
              power_settings_new
            </span>
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
