var express = require('express');
const fs = require('fs');
const utils = require('../utils/utils');

var router = express.Router();

const path = './uploads/';

/* GET list of files. */
router.get('/:imageName', function (req, res, next) {
  const imageName = req.params.imageName;

  let mimeType = '';
  if (utils.isDCM(imageName)) {
    mimeType = 'application/dicom';
  } else {
    mimeType = 'image/tiff';
  }
  let data = 'data:' + mimeType + ';base64,';

  try {
    data += fs.readFileSync(path + imageName).toString('base64');

    res.writeHead(200, {
      'Content-Type': mimeType,
    });
    res.end(JSON.stringify({ image: data }));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Error');
  }
});

module.exports = router;
