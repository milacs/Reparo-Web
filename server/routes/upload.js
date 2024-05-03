var express = require('express');
var multer = require('multer');

var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const imageUpload = multer({ storage: storage }).array('image-files');

router.post('/', imageUpload, (req, res) => {
  console.log('Got a POST request');
  res.send('Got a POST request');
});

module.exports = router;
