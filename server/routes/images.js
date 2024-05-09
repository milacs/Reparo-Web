var express = require('express');
const fs = require('fs');

var router = express.Router();

const path = './uploads/';
const pageSize = 8;

/* GET list of files. */
router.get('/', function (req, res, next) {
  imageList = [];
  const reqPage = parseInt(req.query.page);
  let filesInDir = fs.readdirSync(path);

  start = Math.max(0, pageSize * (reqPage - 1));
  end = Math.min(pageSize * reqPage, filesInDir.length);

  let fileList = filesInDir.slice(start, end);
  const pageCount = Math.ceil(filesInDir.length / pageSize);

  res.send(JSON.stringify({ images: fileList, pages: pageCount }));
});

module.exports = router;
