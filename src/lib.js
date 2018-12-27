const { UNICODE, NEW_LINE, EMPTY_STRING } = require('./constants');

const {
    splitByWhiteSpace,
    arrayAddition
} = require('./util');

const { parseInput } = require('./parser');

const { getFormattedOutput } = require('./formatter');

const countNewLines = (text) => text
    .split(NEW_LINE)
    .length - 1;

const countBytes = (text) => text
    .split(EMPTY_STRING)
    .length;

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

const order = {
    'l': 1,
    'w': 2,
    'c': 3
}

const generateSingleFileCount = function (file, options, readFileSync) {
    let fileContent = readFileSync(file, UNICODE);
    let countArray = counter(fileContent, options);
    return { countArray, file };
}

const getCountWithFileNames = (files, options, fs) => files
    .map(file => generateSingleFileCount(file, options, fs.readFileSync));

const getCount = function (files, options, fs) {
    let countWithFileNames = getCountWithFileNames(files, options, fs);
    if (files.length > 1) {
        countWithFileNames.push(getTotalCount(countWithFileNames));
    }
    let formattedOutput = getFormattedOutput(countWithFileNames);
    return formattedOutput;
}

const extractCountArray = (countWithFileNames) => countWithFileNames
    .map(countWithFileName => countWithFileName.countArray);

const getTotalCount = function (countWithFileNames) {
    let countArray = extractCountArray(countWithFileNames);
    countArray = arrayAddition(countArray);
    return { countArray, file: 'total' };
}

const wc = function (userArgs, fs) {
    let { options, files } = parseInput(userArgs);
    let formatedOutput = getCount(files, options, fs);
    return formatedOutput.join('\n');
}

module.exports = { wc };