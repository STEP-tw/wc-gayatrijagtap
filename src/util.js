const { HYPHEN, SPACE, NEW_LINE, EMPTY_STRING } = require('./constants');

const splitByWhiteSpace = (text) => text
  .split(NEW_LINE)
  .join(SPACE)
  .split(SPACE);

const startsWithHyphen = (elements) => elements
  .filter(element => element.startsWith(HYPHEN));

const removeHyphen = (options) => options
  .map(option => option.slice(1));

const joinAndSplitByEmptyString = (contentArray) => contentArray
  .join(EMPTY_STRING)
  .split(EMPTY_STRING);

const arrayAddition = function (countArray) {
  let totalCount = [];
  for (let outerIndex = 0; outerIndex < countArray[0].length; outerIndex++) {
    let sum = 0;
    for (let innerIndex = 0; innerIndex < countArray.length; innerIndex++) {
      sum = sum + countArray[innerIndex][outerIndex];
    }
    totalCount.push(sum);
  }
  return totalCount;
}

const findUniques = function (uniqueElements, element) {
  if (!uniqueElements.includes(element)) {
    uniqueElements.push(element);
  }
  return uniqueElements;
}

const removeDuplicates = elements => elements
  .reduce(findUniques, []);

module.exports = {
  splitByWhiteSpace,
  startsWithHyphen,
  removeHyphen,
  joinAndSplitByEmptyString,
  arrayAddition,
  removeDuplicates
};