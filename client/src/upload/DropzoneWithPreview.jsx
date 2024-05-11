import React from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '@material-tailwind/react';

import { PreviewWithZoom } from '../dashboard/PreviewWithZoom';
import { getFileType, shortenFileName } from '../helpers/Helpers';
import Translator from '../i18n/Translator';

export const DropzoneWithPreview = ({ callback }) => {
  const [preview, setPreview] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const fileInput = React.useRef();

  const onDrop = React.useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length == 0) {
      fileInput.value = null;
      return;
    }
    const formData = new FormData();
    console.log('LIST OF FILES: ', acceptedFiles);
    acceptedFiles.forEach((file, i) => {
      formData.append('image-files', file, file.name);
    });
    callback(formData);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      'image/tiff': ['.tiff', '.tif'],
      'application/dicom': ['.dcm'],
    },
  });

  const handleOpen = () => setOpen(!open);

  const openPreview = (file) => {
    const fileb64 = new FileReader();
    fileb64.onload = function () {
      setPreview({ b64: fileb64.result, name: file.name });
      handleOpen();
    };
    fileb64.readAsDataURL(file);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((f) => f.name !== fileName));
  };

  return (
    <div className="flex flex-row content-center justify-center h-fit">
      <div className={"sm:flex items-center justify-center aspect-square" + ((files.length > 0) ? ' hidden' : '')}>
        <div {...getRootProps()}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col grow items-center justify-center w-auto h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col grow items-center justify-center mx-10">
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
              <p className="mb-2 text-sm text-gray-900 dark:text-gray-400 flex flex-row flex-wrap justify-center">
                <span className="font-semibold">
                  <Translator path="upload.dropzone.description.main" />
                </span>
                <span className="ps-1">
                  <Translator path="upload.dropzone.description.more" />
                </span>
              </p>
              <p className="text-xs text-gray-900 dark:text-gray-400">
                <Translator path="upload.dropzone.description.files" />
              </p>
            </div>
            <input ref={fileInput} {...getInputProps()} multiple />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col pt-1 sm:ms-4 overflow-y-scroll overflow-x-hidden max-h-[60vh] sm:max-w-[70%] px-1 sm:px-4 grow">
          {files.map((file, i) => (
            <div
              key={i}
              className="bg-gray-50 px-4 py-4 mb-4 rounded-md outline outline-1 outline-gray-300 flex flex-row justify-between content-center items-center"
            >
              <div className="flex flex-col max-w-[70%]">
                <span className="text-gray-900 whitespace-nowrap text-ellipsis overflow-hidden block">
                  {shortenFileName(file.name, 40)}
                </span>
                <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
                  {getFileType(file)}
                </span>
              </div>
              <div className="flex flex-row justify-center content-center">
                <IconButton variant="text" onClick={() => openPreview(file)}>
                  <span className="material-symbols-outlined">preview</span>
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => removeFile(file.name)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
      <PreviewWithZoom open={open} handleOpen={handleOpen} preview={preview} />
    </div>
  );
};
