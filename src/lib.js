const { HYPHEN, SPACE, NEW_LINE, EMPTY_STRING, TAB } = require('./constants');

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
    if (userArgs[0].startsWith(HYPHEN)) {
        let { extractedOptions, fileStartingIndex } = extractOptions(userArgs);
        options = getOrderedOptions(extractedOptions);
        files = userArgs.slice(fileStartingIndex);
    }
    return { options, files };
}

const startsWithHyphen = (elements) => elements
    .filter(element => element.startsWith(HYPHEN));

const removeHyphen = (options) => options
    .map(option => option.slice(1));

const joinAndSplitByEmptyString = (contentArray) => contentArray
    .join(EMPTY_STRING)
    .split(EMPTY_STRING);

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
    return getOptions(optionsWithOrder);
}

const generateSingleFileCount = function (file, options, readFileSync) {
    let fileContent = readFileSync(file, 'utf8');
    let countArray = counter(fileContent, options);
    return { countArray, file };
}

const getCount = function (files, options, fs) {
    let countWithFileName = files.map(file => generateSingleFileCount(file, options, fs.readFileSync));
    if (files.length > 1) {
        countWithFileName.push(getTotalCount(countWithFileName));
    }
    let formattedOutput = countWithFileName.map(countWithFileName => formatOutput(countWithFileName.countArray, countWithFileName.file));
    return formattedOutput;
}

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

const getTotalCount = function (countWithFileName) {
    let countArray = countWithFileName.map(singleCount => singleCount.countArray);
    countArray = arrayAddition(countArray);
    return { countArray, file: 'total' };
}

const wc = function (userArgs, fs) {
    let { options, files } = parseInput(userArgs);
    let formatedOutput = getCount(files, options, fs);
    formatedOutput = formatedOutput.join('\n');
    return formatedOutput;
}

module.exports = { wc };