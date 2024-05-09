const filesDict = { tiff: 'TIFF', dicom: 'DICOM/DICONDE' };
const fileTypes = {
  dcm: filesDict.dicom,
  tif: filesDict.tiff,
  tiff: filesDict.tiff,
};

export const shortenFileName = (fileName, maxLength, includeIdx) => {
  if (maxLength === undefined) maxLength = 40;
  if (includeIdx === undefined) includeIdx = 0;

  const len = fileName.length;
  const preffixStop = maxLength / 2;
  if (len > maxLength) {
    return (
      fileName.slice(0, includeIdx) +
      fileName.slice(includeIdx, preffixStop) +
      '...' +
      fileName.slice(len - preffixStop + 3)
    );
  }

  return fileName;
};

const getFileExtension = (fileName) => {
  var re = /(?:\.([^.]+))?$/;

  return re.exec(fileName)[1];
};

export const getFileType = (file) => {
  if (!file) return '';

  return fileTypes[getFileExtension(file.name)];
};

export const isDCM = (fileName) => {
  if (!fileName) return false;
  if (fileTypes[getFileExtension(fileName)] == 'DICOM/DICONDE') return true;
  else return false;
};

const base64Decode = (input) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';
  let i = 0;

  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  while (i < input.length) {
    const index1 = chars.indexOf(input.charAt(i++));
    const index2 = chars.indexOf(input.charAt(i++));
    const index3 = chars.indexOf(input.charAt(i++));
    const index4 = chars.indexOf(input.charAt(i++));
    const a = (index1 << 2) | (index2 >> 4);
    const b = ((index2 & 15) << 4) | (index3 >> 2);
    const c = ((index3 & 3) << 6) | index4;

    output += String.fromCharCode(a);
    if (index3 !== 64) output += String.fromCharCode(b);
    if (index4 !== 64) output += String.fromCharCode(c);
  }

  return output;
};

export const base64ToArrayBuffer = (base64) => {
  var binaryString = base64Decode(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

export const dcmB64ToArrayBuffer = (b64) => {
  const dcmMimeTypes = [
    'data:application/dicom;base64,',
    'data:application/octet-stream;base64,',
  ];

  for (let index = 0; index < dcmMimeTypes.length; index++) {
    if (b64.indexOf(dcmMimeTypes[index]) != -1) {
      return base64ToArrayBuffer(b64.slice(dcmMimeTypes[index].length));
    }
  }
  console.info('Could not decode base64 string!');
  return null;
};
