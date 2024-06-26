import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { TIFFViewer } from 'react-tiff';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';

import { DICOMViewer } from './DICOMViewer';
import { isDCM } from '../helpers/Helpers';
import Translator from '../i18n/Translator';

export const PreviewWithZoom = ({ open, handleOpen, preview }) => {
  return (
    <Dialog id="preview-modal" open={open} handler={handleOpen} size="xxl">
      <DialogHeader className="flex flex-row justify-between content-center">
        <Translator path="preview.title" />
        <IconButton
          variant="text"
          className="rounded-full flex material-icon-button"
          onClick={handleOpen}
        >
          <span className="material-symbols-outlined">close</span>
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex flex-row justify-center content-center">
        {preview ? (
          <TransformWrapper>
            <TransformComponent>
              {isDCM(preview.name) ? (
                <DICOMViewer src={preview}></DICOMViewer>
              ) : (
                <TIFFViewer
                  tiff={preview.b64}
                  lang="en" // en | de | fr | es | tr | ja | zh | ru | ar | hi
                  paginate="ltr" // bottom | ltr
                  className=""
                />
              )}
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <></>
        )}
      </DialogBody>
    </Dialog>
  );
};
