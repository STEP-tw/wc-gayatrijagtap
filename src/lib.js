const { UNICODE, NEW_LINE, EMPTY_STRING } = require("./constants");

const { splitByWhiteSpace, arrayAddition, generateList } = require("./util");

const { parseInput } = require("./parser");

const { getJustifiedOutput } = require("./formatter");

const { missingFileError } = require("./errorHandler");

const countNewLines = text => text.split(NEW_LINE).length - 1;

const countBytes = text => text.split(EMPTY_STRING).length;

const countWords = text =>
  splitByWhiteSpace(text).filter(word => word != false).length;

const count = {
  line: countNewLines,
  byte: countBytes,
  word: countWords
};

const wc = function(userArgs, fs) {
  let { options, files, optionError } = parseInput(userArgs);
  return optionError || formatOutput(files, options, fs).join("\n");
};

const formatOutput = function(files, options, fs) {
  let countWithFileNames = getFilesCount(files, options, fs);
  if (files.length > 1) {
    let validCountLists = getValidCountLists(countWithFileNames);
    let totalCount = getTotalCount(options.length, validCountLists);
    countWithFileNames.push(totalCount);
  }
  return getJustifiedOutput(countWithFileNames);
};

const getFilesCount = function(files, options, fs) {
  return files.map(generateFileCount.bind(null, options, fs));
};

const generateFileCount = function(options, fs, file) {
  if (!fs.existsSync(file)) {
    return { error: missingFileError(file) };
  }
  let fileContent = fs.readFileSync(file, UNICODE);
  let countList = counter(fileContent, options);
  return { countList, file }; //countList
};

const counter = (fileContent, options) =>
  options.map(option => count[option](fileContent));

const getTotalCount = function(noOfOptions, countWithFileNames) {
  let countList = extractCountList(countWithFileNames);
  if (countList.length < 1) {
    return getMissingFilesTotalCount(noOfOptions);
  }
  countList = arrayAddition(countList);
  return { countList, file: "total" };
};

const extractCountList = countWithFileNames =>
  countWithFileNames.map(countWithFileName => countWithFileName.countList);

const getMissingFilesTotalCount = function(noOfOptions) {
  return { countList: generateList(noOfOptions, 0), file: "total" };
};

const getValidCountLists = countWithFileNames =>
  countWithFileNames.filter(countWithFileName => !countWithFileName.error);

module.exports = { wc };
