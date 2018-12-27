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

const generateSingleFileCount = function (options, readFileSync, file) {
    let fileContent = readFileSync(file, UNICODE);
    let countArray = counter(fileContent, options);
    return { countArray, file };
}

const getCountWithFileNames = function (files, options, fs) {
    let singleFileCountGenerator = generateSingleFileCount.bind(null, options, fs.readFileSync);
    return files.map(singleFileCountGenerator);
}

const getFormattedCount = function (files, options, fs) {
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
    let { options, files, optionError } = parseInput(userArgs);
    return optionError || getFormattedCount(files, options, fs).join('\n')
}

module.exports = { wc };