const fileTypes = { dcm: 'DICOM/DICONDE' };

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
  if (file.type) return file.type;

  return fileTypes[getFileExtension(file.name)];
};

export const isDCM = (file) => {
  if (!file) return false;
  if (!file.name) return false;
  if (fileTypes[getFileExtension(file.name)] == 'DICOM/DICONDE') return true;
};
