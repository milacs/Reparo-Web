import React from 'react';

export const ImgButton = ({ src, alt, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
};
