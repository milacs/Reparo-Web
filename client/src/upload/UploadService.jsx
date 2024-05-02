import React from 'react';

export const UploadContext = React.createContext();

export const UploadService = ({ children }) => {
  const [image, setImage] = React.useState(null);

  return (
    <>
      <UploadContext.Provider value={{ image, setImage }}>
        {children}
      </UploadContext.Provider>
    </>
  );
};
