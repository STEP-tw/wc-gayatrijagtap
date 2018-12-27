const { HYPHEN } = require('./constants');

const {
  startsWithHyphen,
  removeHyphen,
  joinAndSplitByEmptyString,
  removeDuplicates
} = require('./util');

const parseInput = function (userArgs) {
  let options = ['l', 'w', 'c'];
  let files = userArgs;
  if (userArgs[0].startsWith(HYPHEN)) {
    return extractInput(userArgs);
  }
  return { options, files };
}

const extractInput = function (userArgs) {
  let { extractedOptions, fileStartingIndex } = extractOptions(userArgs);
  let options = getOrderedOptions(extractedOptions);
  let files = userArgs.slice(fileStartingIndex);
  return { options, files };
}

const extractOptions = function (userArgs) {
  let optionsWithHyphen = startsWithHyphen(userArgs);
  let fileStartingIndex = optionsWithHyphen.length;
  optionsWithoutHyphen = removeHyphen(optionsWithHyphen);
  let extractedOptions = joinAndSplitByEmptyString(optionsWithoutHyphen);
  return { extractedOptions, fileStartingIndex };
}

const order = {
  'l': 1,
  'w': 2,
  'c': 3
}

const mapOptionWithOrder = (options) => options
  .map(option => [order[option], option]);

const getOptions = (optionsWithOrder) => optionsWithOrder
  .map(optionWithOrder => optionWithOrder[1]);

const getOrderedOptions = function (options) {
  let optionsWithOrder = mapOptionWithOrder(options);
  optionsWithOrder.sort();
  options = getOptions(optionsWithOrder);
  return removeDuplicates(options);
}

module.exports = { parseInput };