import React from 'react';
import axios from 'axios';
import Loading from '../assets/images/loading.gif';

export const ImageThumbnail = ({ id, image }) => {
  const [thumb, setThumb] = React.useState(null);

  const loadThumbnail = (image) => {
    axios
      .get(`http://localhost:3000/thumbnail/${image}`)
      .then((res) => {
        console.log('Thumbnail received!');
        setThumb(res.data.thumbnail);
      })
      .catch((err) => {
        console.log('Error: ' + err);
      });
  };

  React.useEffect(() => {
    if (image) loadThumbnail(image);
  }, []);

  return (
    <div className="flex flex-col justify-center content-center">
      <div
        key={id}
        className="w-40 h-40 m-auto flex bg-white rounded justify-center content-center flex-wrap align"
      >
        {!thumb ? (
          <img className="size-10 m-auto" src={Loading} />
        ) : (
          <img className="m-auto" src={thumb} />
        )}
      </div>
      <span className="text-xs font-light text-center mt-2">{image}</span>
    </div>
  );
};
