const getFileExtension = function (fileName) {
  var re = /(?:\.([^.]+))?$/;

  return re.exec(fileName)[0].toLowerCase();
};

exports.isDCM = function (fileName) {
  if (!fileName) return false;
  if (getFileExtension(fileName) == '.dcm') return true;
  return false;
};
