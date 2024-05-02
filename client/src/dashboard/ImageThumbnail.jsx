import React from 'react';
import axios from 'axios';
import Loading from '../assets/images/loading.gif';

export const ImageThumbnail = ({ id, imageName, onClick }) => {
  const [thumb, setThumb] = React.useState(null);

  const loadThumbnail = (imageName) => {
    axios
      .get(`/thumbnail/${imageName}`)
      .then((res) => {
        console.info('Thumbnail received!');
        setThumb(res.data.thumbnail);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  };

  React.useEffect(() => {
    if (imageName) loadThumbnail(imageName);
  }, []);

  return (
    <button
      key={id}
      onClick={() => onClick(imageName)}
      disabled={!thumb}
      className="flex flex-col justify-center content-center"
    >
      <div className="w-40 h-40 mx-auto mb-2 outline outline-1 outline-gray-300 flex bg-white rounded justify-center content-center flex-wrap align">
        {!thumb ? (
          <img className="size-10 m-auto" src={Loading} />
        ) : (
          <img className="m-auto" src={thumb} />
        )}
      </div>
      <span className="text-xs font-normal text-center mt-2">{imageName}</span>
    </button>
  );
};
