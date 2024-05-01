import React from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthService';
import { Navigate } from 'react-router-dom';
import { ImageThumbnail } from '../ui-components/ImageThumbnail';

export const Dashboard = () => {
  const auth = React.useContext(AuthContext);
  const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    if (auth.isLoggedIn()) {
      getImages();
    }
  }, [auth.getUserData()]);

  const getImages = () => {
    axios
      .get('http://localhost:3000/images/')
      .then((res) => {
        console.log('Axios response: ', res.data);
        setImages(res.data.images);
      })
      .catch((err) => {
        console.log('Error: ' + err);
      })
      .finally(() => {});
  };

  return auth.isLoggedIn() ? (
    <>
      {images && images.length ? (
        <>
          <h1 className="text-center mb-4 text-lg">Imagens de reparos</h1>
          <div className="flex gap-10 bg-gray-100 p-4 m-0 flex-wrap overflow-y-auto h-80 rounded">
            {images.map((image, key) => (
              <ImageThumbnail key={key} image={image} />
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
