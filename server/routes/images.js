var express = require('express');
const fs = require('fs');

var router = express.Router();

const path = './uploads/';

/* GET list of files. */
router.get('/', function (req, res, next) {
  imageList = [];

  let fileList = [];
  fs.readdirSync(path).forEach((fileName) => {
    console.log(fileName);
    fileList.push(fileName);
  });

  res.send(JSON.stringify({ images: fileList }));
});

module.exports = router;
