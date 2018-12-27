const { SPACE, EMPTY_STRING, TAB } = require('./constants');

const formatOutput = function (countArray, fileName) {
  countArray.unshift(EMPTY_STRING);
  return countArray.join(TAB) + SPACE + fileName;
}

const getFormattedOutput = (countWithFileNames) => countWithFileNames
  .map(countWithFileName => formatOutput(countWithFileName.countArray, countWithFileName.file));

module.exports = { getFormattedOutput };