import React from 'react';

export const ImgButton = ({ src, alt, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200 ms-5 size-10 my-auto rounded-full"
    >
      <img src={src} alt={alt} className="mx-auto" />
    </button>
  );
};
