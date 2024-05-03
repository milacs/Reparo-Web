import React from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '@material-tailwind/react';
import { PreviewWithZoom } from '../dashboard/PreviewWithZoom';

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
    },
  });

  const handleOpen = () => setOpen(!open);

  const openPreview = (file) => {
    const fileb64 = new FileReader();
    fileb64.onload = function () {
      setPreview(fileb64.result);
      handleOpen();
    };
    fileb64.readAsDataURL(file);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((f) => f.name !== fileName));
  };

  return (
    <div className="flex flex-row content-center justify-around h-fit">
      <div className="flex items-center justify-center aspect-square">
        <div {...getRootProps()}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col grow items-center justify-center w-auto h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col grow items-center justify-center py-5 px-10">
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
                <span className="font-semibold">Clique para fazer upload</span>{' '}
                ou arraste e solte-os aqui
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Arquivos TIFF
              </p>
            </div>
            <input ref={fileInput} {...getInputProps()} multiple />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col p-0">
          {files.map((file, i) => (
            <div
              key={i}
              className="bg-gray-50 px-4 py-4 mb-4 rounded-md outline outline-1 outline-gray-200 w-80 flex flex-row justify-between content-center items-center"
            >
              <div>
                <span className="text-gray-900">{file.name}</span>
                <span> - </span>
                <span>{file.type}</span>
              </div>
              <div className="flex flex-row justify-center content-center">
                <IconButton variant="text" onClick={() => openPreview(file)}>
                  <span className="material-symbols-outlined">preview</span>
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => removeFile(file.name)}
                >
                  <span className="material-symbols-outlined">close</span>
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
      <PreviewWithZoom
        open={open}
        handleOpen={handleOpen}
        previewImage={preview}
      />
    </div>
  );
};
