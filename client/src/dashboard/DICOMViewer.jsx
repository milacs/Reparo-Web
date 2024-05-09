import React from 'react';
import { parseImage, Renderer } from 'dicom.ts';
import { dcmB64ToArrayBuffer } from '../helpers/Helpers';

export const DICOMViewer = ({ src }) => {
  const canvas = React.useRef(null);
  const renderer = React.useRef(null);

  React.useEffect(() => {
    if (canvas.current && !renderer.current) {
      renderer.current = new Renderer(canvas.current);
    }
    return () => {
      renderer.current.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (src && renderer.current) {
      // console.log('SRC: ' + src.b64);
      const image = parseImage(new DataView(dcmB64ToArrayBuffer(src.b64)));
      renderer.current.render(image, 0).then(() => {});
    }
    return () => {};
  }, [src]);

  return (
    <div>
      <canvas id="dicom-canvas" ref={canvas}></canvas>
    </div>
  );
};
