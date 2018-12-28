const { SPACE, EMPTY_STRING, TAB } = require('./constants');

const formatOutput = function ({ countArray, file, error }) {
  if (error) {
    return TAB + error;
  }
  countArray.unshift(EMPTY_STRING);
  return countArray.join(TAB) + SPACE + file;
}

const getFormattedOutput = (countWithFileNames) => countWithFileNames
  .map(formatOutput);

module.exports = { getFormattedOutput };