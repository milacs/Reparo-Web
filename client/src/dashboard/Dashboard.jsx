import React from 'react';
import axios from 'axios';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { TIFFViewer } from 'react-tiff';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';

import { AuthContext } from '../auth/AuthService';
import { Navigate } from 'react-router-dom';
import { ImageThumbnail } from './ImageThumbnail';
import { UploadContext } from '../upload/UploadService';

export const Dashboard = () => {
  const auth = React.useContext(AuthContext);
  const upld = React.useContext(UploadContext);
  const [images, setImages] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState(false);

  React.useEffect(() => {
    if (auth.isLoggedIn() && upld.image === null) {
      getImages();
    }
  }, [upld.image, auth.getUserData()]);

  const getImages = () => {
    axios
      .get('/images/')
      .then((res) => {
        console.info('GET list of images: ', res.data);
        setImages(res.data.images);
      })
      .catch((err) => {
        console.error('Error getting list of images: ' + err);
      })
      .finally(() => {});
  };

  const getOriginalImage = async (imageName) => {
    return axios
      .get(`/image/${imageName}`)
      .then((res) => {
        return res.data.image;
      })
      .catch((err) => {
        console.error('Error getting original image: ' + err);
        return null;
      });
  };

  const handleOpen = async (imageName) => {
    if (!open) {
      console.info('Preview image name: ' + imageName);
      const image = await getOriginalImage(imageName);
      setPreviewImage(image);
    } else {
      setPreviewImage(null);
    }
    setOpen(!open);
  };

  return auth.isLoggedIn() ? (
    <>
      <Dialog id="preview-modal" open={open} handler={handleOpen} size="xl">
        <DialogHeader className="flex flex-row justify-between content-center">
          Preview
          <IconButton
            variant="text"
            className="rounded-full flex material-icon-button"
            onClick={handleOpen}
          >
            <span className="material-symbols-outlined">close</span>
          </IconButton>
        </DialogHeader>
        <DialogBody className="flex flex-row justify-center content-center">
          {previewImage && (
            <TransformWrapper>
              <TransformComponent>
                <TIFFViewer
                  tiff={previewImage}
                  lang="en" // en | de | fr | es | tr | ja | zh | ru | ar | hi
                  paginate="ltr" // bottom | ltr
                  className=""
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </DialogBody>
      </Dialog>
      {images && images.length ? (
        <>
          <h1 className="text-center mb-4 text-lg mt-8">Imagens de reparos</h1>
          <div className="flex gap-10 bg-gray-100 p-4 m-0 flex-wrap overflow-y-auto h-80 rounded">
            {images.map((image, key) => (
              <ImageThumbnail
                key={key}
                imageName={image}
                onClick={handleOpen}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-center my-40">Nenhuma imagem ainda :(</p>
        </>
      )}
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
