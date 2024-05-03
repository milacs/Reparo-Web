import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { TIFFViewer } from 'react-tiff';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from '@material-tailwind/react';

export const PreviewWithZoom = ({ open, handleOpen, previewImage }) => {
  return (
    <Dialog id="preview-modal" open={open} handler={handleOpen} size="xl">
      <DialogHeader className="flex flex-row justify-between content-center">
        Preview
        <IconButton
          variant="text"
          className="rounded-full flex material-icon-button"
          onClick={handleOpen}
        >
          <span className="material-symbols-outlined">close</span>
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex flex-row justify-center content-center">
        {previewImage ? (
          <TransformWrapper>
            <TransformComponent>
              <TIFFViewer
                tiff={previewImage}
                lang="en" // en | de | fr | es | tr | ja | zh | ru | ar | hi
                paginate="ltr" // bottom | ltr
                className=""
              />
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <></>
        )}
      </DialogBody>
    </Dialog>
  );
};
