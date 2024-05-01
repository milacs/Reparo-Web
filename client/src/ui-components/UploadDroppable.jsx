import axios from 'axios';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ImgButton } from './ImgButton';
import Upload from '../assets/images/upload.svg';

export const UploadDroppable = () => {
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const fileInput = React.useRef();

  const onDrop = React.useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length == 0) {
      fileInput.value = null;
      return;
    }
    const formData = new FormData();
    formData.append('image-file', acceptedFiles[0], acceptedFiles[0].name);
    setImage(formData);

    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (image === null) {
      alert('Invalid file!');
      setImage(null);
      return;
    }

    axios
      .post('http://localhost:3000/upload', image)
      .then((res) => {
        console.log('Axios response: ', res);
        alert('Uploaded successfully!');
      })
      .catch((err) => {
        console.log('Error: ' + err);
      })
      .finally(() => {
        setImage(null);
      });
  };

  return (
    <div className="flex flex-row justify-center flex-wrap content-center w-fit  h-fit">
      <div className="flex items-center justify-center w-full">
        <div {...getRootProps()}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input ref={fileInput} {...getInputProps()} />
          </label>
        </div>
      </div>
      <ImgButton
        className=""
        src={Upload}
        alt="Upload"
        onClick={handleUpload}
      />
      <img className="w-40" src={preview} />
    </div>
  );
};
