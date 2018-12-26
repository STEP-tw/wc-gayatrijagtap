const { SPACE, NEW_LINE, EMPTY_STRING, TAB } = require('./constants');

const countNewLines = (text) => text
    .split(NEW_LINE)
    .length - 1;

const countBytes = (text) => text
    .split(EMPTY_STRING)
    .length;

const splitByWhiteSpace = (text) => text
    .split(NEW_LINE)
    .join(SPACE)
    .split(SPACE);

const countWords = (text) => splitByWhiteSpace(text)
    .filter(word => word != false)
    .length;

const count = {
    'l': countNewLines,
    'c': countBytes,
    'w': countWords
}

const counter = (content, options) => options
    .map(option => count[option](content));

const formatOutput = function (countArray, fileName) {
    countArray.unshift(EMPTY_STRING);
    return countArray.join(TAB) + SPACE + fileName;
}

const parseInput = function (userArgs) {
    let options = ['l', 'w', 'c'];
    let files = userArgs;
    if (userArgs[0].startsWith('-')) {
        let { extractedOptions, fileStartingIndex } = extractOptions(userArgs);
        options = getOrderedOptions(extractedOptions);
        files = userArgs.slice(fileStartingIndex);
    }
    return { options, files };
}

const startsWithHyphen = (elements) => elements
    .filter(element => element.startsWith('-'));

const removeHyphen = (options) => options
    .map(option => option.slice(1));

const splitAndJoinByEmptyString = (contentArray) => contentArray
    .join(EMPTY_STRING)
    .split(EMPTY_STRING);

const extractOptions = function (userArgs) {
    let optionsWithHyphen = startsWithHyphen(userArgs);
    let fileStartingIndex = optionsWithHyphen.length;
    optionsWithoutHyphen = removeHyphen(optionsWithHyphen);
    let extractedOptions = splitAndJoinByEmptyString(optionsWithoutHyphen);
    return { extractedOptions, fileStartingIndex };
}

const order = {
    'l': 1,
    'w': 2,
    'c': 3
}

const getOrderedOptions = function (options) {
    return orderOptions(options);
}

const mapOptionWithOrder = (options) => options
    .map(option => [order[option], option]);

const getOptions = (optionsWithOrder) => optionsWithOrder
    .map(optionWithOrder => optionWithOrder[1]);

const orderOptions = function (options) {
    optionsWithOrder = mapOptionWithOrder(options);
    optionsWithOrder.sort();
    orderedOptions = getOptions(optionsWithOrder);
    return orderedOptions;
}

const generateSingleFileCount = function (file, options, readFileSync) {
    let fileContent = readFileSync(file, 'utf8');
    let countArray = counter(fileContent, options);
    let formatedOutput = formatOutput(countArray, file);
    return formatedOutput;
}

const getFormattedOutput = (files, options, fs) => files
    .map(file => generateSingleFileCount(file, options, fs.readFileSync));

const wc = function (userArgs, fs) {
    let { options, files } = parseInput(userArgs);
    let formatedOutput = getFormattedOutput(files, options, fs);
    formatedOutput = formatedOutput.join('\n');
    return formatedOutput;
}

module.exports = { wc };