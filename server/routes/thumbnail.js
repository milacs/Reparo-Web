var express = require('express');
const fs = require('fs');
const imageThumbnail = require('image-thumbnail');
const dicomParser = require('dicom-parser');
const utils = require('../utils/utils');

var router = express.Router();

const path = './uploads/';

const getThumbnailFromPath = async function (file) {
  try {
    const thumbnail = `data:image/png;base64,${await imageThumbnail(
      path + file,
      {
        width: 160,
        height: 160,
        responseType: 'base64',
        jpegOptions: { force: true, quality: 100 },
        fit: 'inside',
      },
    )}`;
    return thumbnail;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getThumbnailFromDCM = async function (base64) {
  try {
    const thumbnail = `data:image/png;base64,${await imageThumbnail(base64, {
      width: 160,
      height: 160,
      responseType: 'base64',
      jpegOptions: { force: true, quality: 100 },
      fit: 'inside',
    })}`;
    return thumbnail;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getDICOMPixelData = function (fileName) {
  var dicomAsBuffer = fs.readFileSync(path + fileName);
  var dataSet = dicomParser.parseDicom(dicomAsBuffer);

  var pixelData = dataSet.elements.x7fe00010;

  if (pixelData.encapsulatedPixelData) {
    if (pixelData.basicOffsetTable.length) {
      var imageFrame = dicomParser.readEncapsulatedImageFrame(
        dataSet,
        pixelData,
        0,
      );
    } else {
      var imageFrame = dicomParser.readEncapsulatedPixelDataFromFragments(
        dataSet,
        pixelData,
        0,
        pixelData.fragments.length,
      );
    }
  }

  return imageFrame;
};

/* GET image thumbnail. */
router.get('/:imageName', async function (req, res, next) {
  const imageName = req.params.imageName;

  let thumbnail = {};
  if (utils.isDCM(imageName)) {
    thumbnail = await getThumbnailFromDCM(getDICOMPixelData(imageName));
  } else {
    thumbnail = await getThumbnailFromPath(imageName);
  }

  res.send(JSON.stringify({ thumbnail: thumbnail }));
});

module.exports = router;
