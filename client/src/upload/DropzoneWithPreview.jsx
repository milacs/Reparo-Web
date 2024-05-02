import React from 'react';
import { useDropzone } from 'react-dropzone';
import { TIFFViewer } from 'react-tiff';

import Loading from '../assets/images/loading.gif';

export const DropzoneWithPreview = ({ callback }) => {
  const [preview, setPreview] = React.useState(null);
  const fileInput = React.useRef();

  const onDrop = React.useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length == 0) {
      fileInput.value = null;
      return;
    }
    const formData = new FormData();
    formData.append('image-file', acceptedFiles[0], acceptedFiles[0].name);
    callback(formData);

    const file = new FileReader();
    file.onload = function () {
      console.info('Dropped image: ' + file.result);
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      'image/tiff': ['.tiff', '.tif'],
    },
  });

  return (
    <div className="flex flex-row content-center justify-around h-fit mb-10 mx-10">
      <div className="flex items-center justify-center aspect-square">
        <div {...getRootProps()}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col grow items-center justify-center w-auto h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
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
            <input ref={fileInput} {...getInputProps()} />
          </label>
        </div>
      </div>
      <span className="material-symbols-outlined my-auto mx-4 icon-36 text-gray-500">
        chevron_right
      </span>
      <div className="min-w-[400px] max-w-[400px] rounded aspect-square flex flex-column justify-center content-center bg-gray-50 outline outline-1 outline-gray-400">
        {preview ? (
          // <img className="object-scale-down object-center" src={preview} />
          <>
            <img
              className="size-10 m-auto -z-[1] fixed top-[50%]"
              src={Loading}
            />
            <TIFFViewer
              tiff={preview}
              lang="en" // en | de | fr | es | tr | ja | zh | ru | ar | hi
              paginate="ltr" // bottom | ltr
            />
          </>
        ) : (
          <span className="material-symbols-outlined m-auto text-gray-500 icon-64">
            preview
          </span>
        )}
      </div>
    </div>
  );
};
