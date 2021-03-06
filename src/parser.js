const { HYPHEN } = require("./constants");

const {
  leadingElementsStartsWithCharacter,
  removeLeadingChar,
  joinAndSplitByEmptyString,
  removeDuplicates
} = require("./util");

const { handleOptionError } = require("./errorHandler");

const parseInput = function(userArgs) {
  let options = ["line", "word", "byte"];
  let files = userArgs;
  if (userArgs[0].startsWith(HYPHEN)) {
    return extractArgs(userArgs);
  }
  return { options, files };
};

const extractArgs = function(userArgs) {
  let { extractedOptions, fileStartingIndex } = getOptions(userArgs);
  let optionError = handleOptionError(extractedOptions);
  let optionsWithoutMapping = getOrderedOptions(extractedOptions);
  let options = mapOptionsToLineWordByte(optionsWithoutMapping);
  let files = userArgs.slice(fileStartingIndex);
  return { options, files, optionError };
};

const getOptions = function(userArgs) {
  let optionsWithHyphen = leadingElementsStartsWithCharacter(userArgs, HYPHEN);
  let fileStartingIndex = optionsWithHyphen.length;
  let optionsWithoutHyphen = removeLeadingChar(optionsWithHyphen);
  let extractedOptions = joinAndSplitByEmptyString(optionsWithoutHyphen);
  return { extractedOptions, fileStartingIndex };
};

const getOrderedOptions = function(options) {
  let optionsWithOrder = mapOptionWithOrder(options);
  optionsWithOrder.sort();
  options = extractOptionsFromOrder(optionsWithOrder);
  return removeDuplicates(options);
};

const mapOptionWithOrder = options =>
  options.map(option => [order[option], option]);

const order = {
  l: 1,
  w: 2,
  c: 3
};

const mapOptionsToLineWordByte = options =>
  options.map(option => optionsMapping[option]);

const optionsMapping = {
  l: "line",
  w: "word",
  c: "byte"
};

const extractOptionsFromOrder = optionsWithOrder =>
  optionsWithOrder.map(optionWithOrder => optionWithOrder[1]);

module.exports = { parseInput };
