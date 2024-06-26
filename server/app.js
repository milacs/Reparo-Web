var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

require('dotenv').config();

fs.mkdir('./uploads', { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

var app = express();

var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var imagesRouter = require('./routes/images');
var getThumbnail = require('./routes/thumbnail');
var imageRouter = require('./routes/image');

//ADD BODY-PARSER CODE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:5173';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({ origin: [corsOrigin], methods: ['GET', 'POST'], credentials: true }),
);

app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/images', imagesRouter);
app.use('/thumbnail', getThumbnail);
app.use('/image', imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.error = err;

  console.log('Error: ' + err);

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
