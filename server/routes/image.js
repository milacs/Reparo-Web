var express = require('express');
const fs = require('fs');
const imageThumbnail = require('image-thumbnail');

var router = express.Router();

const path = '/tmp/data/';

/* GET list of files. */
router.get('/:imageName', function (req, res, next) {
  const imageName = req.params.imageName;
  console.log('Image name: ' + imageName);

  let data = 'data:image/tiff;base64,';
  try {
    data += fs.readFileSync(path + imageName).toString('base64');
    // const image = Buffer.from(data, 'base64');
    // console.log('Image data: ' + data);
    res.writeHead(200, {
      'Content-Type': 'image/tiff',
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
