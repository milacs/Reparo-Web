var express = require('express');
const fs = require('fs');
const imageThumbnail = require('image-thumbnail');

var router = express.Router();

const path = './uploads/';

const getThumbnail = async function (file) {
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

/* GET list of files. */
router.get('/:imageName', async function (req, res, next) {
  const imageName = req.params.imageName;

  let thumbnail = await getThumbnail(imageName);

  res.send(JSON.stringify({ thumbnail: thumbnail }));
});

module.exports = router;
