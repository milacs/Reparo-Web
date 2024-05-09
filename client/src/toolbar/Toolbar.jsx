import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';

import { AuthContext } from '../auth/AuthService';
import { UploadContext } from '../upload/UploadService';
import { UserInfo } from './UserInfo';
import { DropzoneWithPreview } from '../upload/DropzoneWithPreview';
import Translator from '../i18n/Translator';
import Logo from '../assets/images/logo.svg';

const Toolbar = () => {
  const auth = React.useContext(AuthContext);
  const upld = React.useContext(UploadContext);

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const logout = () => {
    googleLogout();
    auth.clearUserData();
    redirect('/login');
  };

  React.useEffect(() => {
    upld.setImage(null);
  }, [open]);

  const handleOpen = () => setOpen(!open);

  const handleUpload = () => {
    if (upld.image === null) {
      alert('Invalid file!');
      upld.setImage(null);
      return;
    }

    setLoading(true);
    axios
      .post('/upload', upld.image)
      .then((res) => {
        console.info('Axios response: ', res);
        setOpen(false);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      })
      .finally(() => {
        upld.setImage(null);
        setLoading(false);
      });
  };

  return (
    <>
      <div
        id="toolbar"
        className="
      container flex flex-row justify-between align-middle
      h-[8.5vh] w-full max-w-none
      px-4 py-2
      bg-white shadow"
      >
        <div id="logo" className="flex flex-row justify-between">
          <img src={Logo} className="grow-0 w-12 me-2" />
          <span className="my-auto font-normal text-xl hidden sm:block">
            Reparo Web
          </span>
        </div>
        {auth && auth.isLoggedIn() && (
          <div className="flex flex-row w-fit sm:gap-5">
            <Button
              onClick={handleOpen}
              variant="text"
              className="flex items-center gap-3 font-normal text-gray-900 material-button"
            >
              <span className="material-symbols-outlined">cloud_upload</span>
              <span className="hidden sm:block">
                <Translator path="upload.action" />
              </span>
            </Button>
            <Dialog
              id="dropzone-modal"
              open={open}
              handler={handleOpen}
              size="xl"
            >
              <DialogHeader className="flex flex-row justify-between content-center">
                <Translator path="upload.action" />
                <IconButton
                  variant="text"
                  className="rounded-full flex material-icon-button"
                  onClick={handleOpen}
                >
                  <span className="material-symbols-outlined">close</span>
                </IconButton>
              </DialogHeader>
              <DialogBody>
                <DropzoneWithPreview callback={upld.setImage} />
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="outlined"
                  color="gray"
                  className=""
                  loading={loading}
                  onClick={handleUpload}
                  disabled={upld.image === null}
                >
                  <Translator path="upload.button" />
                </Button>
              </DialogFooter>
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="light"
        transition:Flip
      />
    </>
  );
};

export default Toolbar;
