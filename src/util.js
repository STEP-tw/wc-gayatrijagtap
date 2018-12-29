const { HYPHEN, SPACE, NEW_LINE, EMPTY_STRING } = require("./constants");

const splitByWhiteSpace = text =>
  text
    .split(NEW_LINE)
    .join(SPACE)
    .split(SPACE);

const removeLeadingChar = options => options.map(option => option.slice(1));

const joinAndSplitByEmptyString = contentArray =>
  contentArray.join(EMPTY_STRING).split(EMPTY_STRING);

const generateList = function(length, element) {
  return new Array(length).fill(element);
};

const addArrays = function(array1, array2) {
  let addition = [];
  for (let index = 0; index < array1.length; index++) {
    addition.push(array1[index] + array2[index]);
  }
  return addition;
};

const arrayAddition = function(arrayOfArray) {
  return arrayOfArray.reduce(addArrays);
};

const findUniques = function(uniqueElements, element) {
  if (!uniqueElements.includes(element)) {
    uniqueElements.push(element);
  }
  return uniqueElements;
};

const removeDuplicates = elements => elements.reduce(findUniques, []);

const leadingElementsStartsWithCharacter = function(elements, character) {
  let elementsStartsWithCharacter = [];
  for (let index = 0; index < elements.length; index++) {
    if (!elements[index].startsWith(character)) {
      return elementsStartsWithCharacter;
    }
    elementsStartsWithCharacter.push(elements[index]);
  }
  return elementsStartsWithCharacter;
};

module.exports = {
  splitByWhiteSpace,
  leadingElementsStartsWithCharacter,
  removeLeadingChar,
  joinAndSplitByEmptyString,
  arrayAddition,
  removeDuplicates,
  generateList
};
