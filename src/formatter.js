const { SPACE, EMPTY_STRING, TAB } = require('./constants');

const justifyOutput = function ({ countList, file, error }) {  //justifyOutput
  if (error) {
    return TAB + error;
  }
  countList.unshift(EMPTY_STRING);
  return countList.join(TAB) + SPACE + file;
}

const getJustifiedOutput = (countWithFileNames) => countWithFileNames
  .map(justifyOutput);

module.exports = { getJustifiedOutput };