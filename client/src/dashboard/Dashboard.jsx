import React from 'react';
import axios from 'axios';

import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, Button } from '@material-tailwind/react';

import { AuthContext } from '../auth/AuthService';
import { ImageThumbnail } from './ImageThumbnail';
import { UploadContext } from '../upload/UploadService';
import { PreviewWithZoom } from './PreviewWithZoom';
import Translator from '../i18n/Translator';

export const Dashboard = () => {
  const auth = React.useContext(AuthContext);
  const upld = React.useContext(UploadContext);
  const [images, setImages] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [preview, setPreview] = React.useState(null);

  React.useEffect(() => {
    if (auth.isLoggedIn() && upld.image === null) {
      getImages();
    }
  }, [upld.image, auth.getUserData(), currentPage]);

  const getImages = () => {
    axios
      .get('/images/', { params: { page: currentPage } })
      .then((res) => {
        console.info('GET list of images: ', res.data);
        setImages(res.data.images);
        setPageCount(res.data.pages);
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
      toast(<Translator path="preview.toast" />);
      const image = await getOriginalImage(imageName);
      const timeout = setTimeout(() => {
        setPreview({ b64: image, name: imageName });
        setOpen(true);
        clearTimeout(timeout);
      }, 300);
    } else {
      setPreview(null);
      setOpen(false);
    }
  };

  const loadPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(pageCount, parseInt(page))));
  };
  const nextPage = () => {
    loadPage(currentPage + 1);
  };
  const previousPage = () => {
    loadPage(currentPage - 1);
  };

  return auth.isLoggedIn() ? (
    <>
      <PreviewWithZoom open={open} handleOpen={handleOpen} preview={preview} />
      {images && images.length ? (
        <>
          <h1 className="text-center mb-4 text-lg mt-8">
            <Translator path="dashboard.title" />
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-row grid-rows-auto gap-8 bg-gray-100 p-4 m-0 overflow-y-auto h-[75%] rounded">
            {images.map((image) => (
              <ImageThumbnail
                key={image}
                imageName={image}
                onClick={handleOpen}
                loading={preview !== null}
              />
            ))}
          </div>
          <div id="pagination" className="float-end mt-2">
            <IconButton
              variant="outlined"
              className="m-2 border-gray-500 material-icon-button"
              onClick={previousPage}
              disabled={currentPage == 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </IconButton>
            {pageCount > 0 &&
              Array.from(Array(pageCount), (e, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outlined"
                  className="m-2 border-gray-500 material-button"
                  onClick={() => {
                    loadPage(page);
                  }}
                  disabled={currentPage == page}
                >
                  {page}
                </Button>
              ))}
            <IconButton
              variant="outlined"
              className="m-2 border-gray-500 material-icon-button"
              disabled={currentPage == pageCount}
              onClick={nextPage}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </IconButton>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            pauseOnHover
            theme="light"
            transition:Flip
          />
        </>
      ) : (
        <>
          <p className="text-center my-40">
            <Translator path="dashboard.empty" />
          </p>
        </>
      )}
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};
